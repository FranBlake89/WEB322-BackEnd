/*
    - Name: Francisco Castillo
    - StudentID: 
    - Section: NAA
    - Course: WEB-322
*/
/**
 * carList.js
 *
 * The list of cars are defined in an Array of category Objects. Each
 * category Object has the following properties:
 *
 *  - type: String, type of car (e.g., "SUV", "SEDAN", "HATCHBACK")
 *  - licensePlate: String, the human-readable license plate for the car (e.g., "AAA 123")
 *  - is_available: boolean, check the availability of the car (e.g., true)
 */

let carList = [
    {
        type : "SUV",
        licensePlate : "ABC 124",
        is_available : false,
        setType: function(newType){this.type = newType},
        setLicense: function(newPlate){this.licensePlate = newPlate},
        setAvailable: function(bool){this.is_available = bool},
        getType: function(){return this.type},
        getLicense: function(){return this.licensePlate},
        getAvailable: function(){return this.is_available}
    },
    {
        type : "Sedan",
        licensePlate : "BXL 009",
        is_available : true,
        setType: function(newType){this.type = newType},
        setLicense: function(newPlate){this.licensePlate = newPlate},
        setAvailable: function(bool){this.is_available = bool},
        getType: function(){return this.type},
        getLicense: function(){return this.licensePlate},
        getAvailable: function(){return this.is_available}
    },
    {
        type : "SUV",
        licensePlate : "KML 155",
        is_available : true,
        setType: function(newType){this.type = newType},
        setLicense: function(newPlate){this.licensePlate = newPlate},
        setAvailable: function(bool){this.is_available = bool},
        getType: function(){return this.type},
        getLicense: function(){return this.licensePlate},
        getAvailable: function(){return this.is_available}
    },
];
// export module, allow read the info in this file
module.exports = carList;