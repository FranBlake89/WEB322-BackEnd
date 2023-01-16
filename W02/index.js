console.log("Hello World");
//import the prompt-sync package
const prompt = require("prompt-sync")();

////use the package
const nameInput = prompt("Enter your name: ");
console.log( `Your Name is ${nameInput}`);

//Whatever  you use prompt, prompt will return the data to you as a STRING data type

