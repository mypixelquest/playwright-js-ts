// Declare a variable `customerFirstName` of type string and assign it a value
var customerFirstName: string = "John";

// Declare a variable `customerLastName` of type string and assign it a value
var customerLastName: string = "Doe";

// Declare a variable `customerAge` of type number and assign it a value
var customerAge: number = 15;

// Uncommenting the following line will cause a TypeScript error because `customerFirstName` is declared as a string
// and assigning a number to it is not allowed.
// customerFirstName = 10;

// Define a custom type `Customer` with three properties: `firstName`, `lastName`, and `active`
type Customer = {
    firstName: string; // The first name of the customer (string)
    lastName: string;  // The last name of the customer (string)
    active: boolean;   // Whether the customer is active (boolean)
};

// Create a variable `firstCustomer` of type `Customer` and assign it an object that matches the `Customer` type
var firstCustomer: Customer = {
    firstName: "John", // Assign the first name
    lastName: "Doe",   // Assign the last name
    active: true,      // Set the active status to true
};
