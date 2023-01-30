/*
*   - Name: Francisco Castillo
*   - StudentID: 
*   - Section: NAA
*   - Course: WEB-322

* DESCRIPTION:
* Standalone console-based Javascript program that lets the user reserve a car rental. 
* The user must be able to enter the type of vehicle, number of days of the rental, 
* and whether they want a child seat in the car.  Based on this user input, the 
* program should search for an available vehicle.  If a vehicle is available, then 
* calculate and output a receipt for the rental.

* FILES
* carList.js    : contain list of cars
* index.js      : contain main function    
* package.json

* NODE PACKAGE
* prompt-sync   : allow us to use to command prompt
* UUID          : allow us to create random ID for reservation
*/

//Create package.json
    // >> node init  <<

//import the UUID package  (https://github.com/uuidjs/uuid#quickstart)
    // >> npm install uuid  <<
const { v4: uuidv4 } = require('uuid');
   // e.g. uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

//import the prompt-sync package
    // >> npm install prompt-sync  <<
const prompt = require("prompt-sync")();

//import the carList.js file
const carList = require( './carList.js' );
/* NOTE :
    *  This also require add to the another file (carList.js),
    *      the next line:
    * >>   module.exports = carList;  <<
*/

// DEBUG            PASS
//checking if I can access to the file carList.js
/* ***************
for (let index = 0; index < carList.length; index++) {
    console.log(carList[index].type);    
}
//OUTPUT:
//  SUV
//  Sedan
//  SUV
*******************/
class car {
    type;
    licensePlate;
    is_available = false;

    constructor (setType = "", setLicense  = "" ){
        this.type = setType;
        this.licensePlate = setLicense;
    }
    setType(newType){
        this.type = newType;
    }
    setLicense(newPlate){
        this.licensePlate = newPlate;
    }
    setAvailable(bool){
        this.is_available = bool;
    }
    getType(){
        return this.type;
    }
    getLicense(){
        return this.licensePlate;
    }
    getAvailable(){
        return this.is_available;
    }
}

class carReserve extends car { 
    id;
    days;
    car_seat = false;
    taxes;
    subtotal;
    total;
    constructor (setID = "", setDays = 0, setTaxes=0, setSub = 0, setTotal =0){
        super();
        this.id = setID;
        this.days = setDays;
        this.taxes = setTaxes
        this.subtotal = setSub;
        this.total = setTotal;
    }
    setID(ID){        this.id = ID;           }
    setSeat(bool){    this.car_seat = bool;   }
    setDays(number){  this.days = number; }
    setTaxes(tax){    this.taxes = tax;       }
    setSubtotal(subT){ this.subtotal = subT;  }
    setTotal(total){   this.total = total;    }
    getSeat(){  return this.car_seat;   }
    getDays(){  return this.days;   }
    getID(){    return this.id;         }
    getTaxes(){ return this.taxes;      }
    getSubtotal(){ return this.subtotal;}
    getTotal(){  return this.total;     }
}
const findVehicle = (carType) => {
    let position; 
    
    for (let index = 0; index < carList.length; index++) {

        let type = carList[index].type;

        if( //check type and if the vehicle is available
            (type.toLocaleUpperCase() === carType.toLocaleUpperCase()) && 
            (carList[index].is_available === true) 
        ){
                position = index;
                break;  // breaks out of the loop early
        }
        else{
            position = -1;
        }
    }
   // console.log(`*****\n POSITION: ${position}\n***********\n`);
    return position;
}

const createReservation = (reservationDetails) => {
    // code to create a new reservation using the reservationDetails object
    let result = -1;

    let index = findVehicle(reservationDetails.type);

    //console.log(`the index is ${index}`);
    if(index >= 0){
       // console.log(`the user input was ${reservationDetails.type}, that found an item in the index ${index}`);
        
       //   setting NO available in CARLIST
        carList[index].setAvailable(false);

        //  Getting info from CARLIST
        let licenseCAR =  carList[index].getLicense();
        let availableCAR = carList[index].getAvailable();
        
        //  Copying another properties to my NEW reservation
        reservationDetails.setLicense(licenseCAR);
        reservationDetails.setAvailable(availableCAR);

// DEBUG            PASS
/*
let lic = reservationDetails.getLicense();
console.log("******************************");
console.log(`license new ${lic}`);
lic = carList[index].getLicense();
console.log(`license CARLIST ${lic}`);
*/        
        //  generating reservation ID
        let newId = uuidv4();
        reservationDetails.setID(newId);

        result = calculateCost(reservationDetails);
         

    }else{
        console.log("\nA matching vehicle cannot be found");
    }

    return result;
}

const calculateCost = (newReservation) => {
    let  total = 0;
    let subTotal =0;
    let dailyRate = -1;
    let seatFee = 0;
    let taxes = 0.13;  //13% taxes

    const days = newReservation.getDays();
    const type = newReservation.getType().toLocaleUpperCase() ;
    const seat = newReservation.getSeat();

// *  Sedans are $10 per day, 
// *  SUV are $15 per day, 
// *  other vehicle types are $20 per day.

    if(type === 'SUV'){ dailyRate = 15 ; }
    else if( type === 'SEDAN'){ dailyRate = 10 ; }
    else{  dailyRate = 20 ; }

    rentalFee = days * dailyRate ;

// * seat fee:  If the user requests a car seat, then the fee is $5 per day.  
// * Rentals that are 3 or more days are charged at a rate of $2 per day.
    if( (seat) && (days < 3)) { seatFee = ( 5 * days ); }
    else if ( (seat) && (days >= 3) ) { seatFee = ( 2 * days ); }

// * SUBTOTAL no taxes
    subTotal = ( rentalFee + seatFee ) ;
// * Sales tax is 13%.  
    taxes = ( subTotal * taxes ); 
// * TOTAL COST AFTER TAXES
    total = ( rentalFee + seatFee + taxes );

    //Setting values into the NEW RESERVATION
    newReservation.setTaxes(taxes);
    newReservation.setSubtotal(subTotal);
    newReservation.setTotal(total);

// DEBUG   PASS 
/*
let t = newReservation.getTaxes();
let s = newReservation.getSubtotal();
let T = newReservation.getTotal();
console.log("******************************");
console.log(`taxes new ${t}`);
console.log(`subtotal new ${s}`);
console.log(`total new ${T}`);
console.log(`dailyRate new ${dailyRate}`);
console.log(`seatFee new ${seatFee}`);
console.log(`rentalFee new ${rentalFee}`);
console.log(`days new ${days}`);
console.log(`type new ${type}`);
console.log(`seat new ${seat}`);

console.log(`***************************`);
  */    

    return total;
}

const welcome = () =>{
    console.log(
        "\n------------------------------",
        "\nWelcome to David's Car Rentals",
        "\n------------------------------"
    );
}

const displayReservation = (Reservation) => {

    console.log(
        "\n------------------",
        "\nRECEIPT",
        "\n------------------",
        "\nReservation Number: ",
        Reservation.getID(),
        "\nCar Type: ",
        Reservation.getType(),
        "\nLicense Plate: ",
        Reservation.getLicense(),
        "\nSubtotal: $",
        Reservation.getSubtotal(),
        "\nTax: $",
        Reservation.getTaxes(),
        "\nTotal: $",
        Reservation.getTotal()
    );
}
                    
const main = () => {
    
    welcome();
    
    const typeInput = prompt("What type of car do you want to rent? ");
    const daysInput = prompt("How many days? (min 1): ");
    const carSeatInput = prompt("Do you need a car seat? (y/n): ");
    
    //there must be a user input validation here
// * create a new Object called "newReservation"
    let newReservation = new carReserve();
// * Inserting values into new Obj
    newReservation.setType(typeInput);
    newReservation.setDays(daysInput);

    if(carSeatInput === 'y' || carSeatInput === 'Y' ){
        newReservation.setSeat(true);
    }
    else{ newReservation.setSeat(false) ; }
        

    let flag;
    
    flag = createReservation(newReservation);
       // console.log(` >>>>>>>\n flag ${flag}\n ${typeof(flag)}`);

    if(flag > 0){

        displayReservation(newReservation);
    }
    else{
        //error
        //CREATE A BETTER FUNCTION TO CATCH ERRORS
        // TRY....CATCH
    }
}

main();