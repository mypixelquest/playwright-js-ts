// Concatination and Interpolation

var price = 50;
var itemName = "Cup";
var messageToPrint1 =
  "The price of the " + itemName + " is " + price + " dollars"; // Concatination

var messageToPrint2 = `The price of the ${itemName} is ${price} dollars`; // Interpolation
console.log(messageToPrint1);
console.log(messageToPrint2);
