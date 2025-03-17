// VARIABLES

// Using 'var' (older way, not recommended in modern JavaScript)
var firstName = "Alice";
var lastName = "Johnson";
console.log(firstName + " " + lastName); // Output: Alice Johnson

// Declaring multiple variables
var age, birthYear, gender;
age = 28;
birthYear = 1996;
gender = "Female";

console.log("Age:", age); // Output: Age: 28
age = 30; // Reassigning value
console.log("Updated Age:", age); // Output: Updated Age: 30

// CONSTANTS

// Use 'const' when the value should not change
const jobTitle = "Software Engineer";
const country = "Canada";
console.log(jobTitle, "from", country); // Output: Software Engineer from Canada

// jobTitle = "Data Scientist"; // ❌ Error: Assignment to constant variable

// DATA TYPES

// String
var middleName = "Marie";

// Number
var yearsOfExperience = 7;
var salary = 75000.5; // Can be integer or floating-point

// Boolean
var isEmployed = true;
var hasDriverLicense = false;

// Null (explicitly no value)
var spouseName = null;

// Undefined (declared but not assigned yet)
var numberOfChildren;

console.log("Middle Name:", middleName);
console.log("Experience:", yearsOfExperience, "years");
console.log("Salary:", salary);
console.log("Employment Status:", isEmployed);
console.log("Has Driver's License:", hasDriverLicense);
console.log("Spouse Name:", spouseName); // Output: null
console.log("Number of Children:", numberOfChildren); // Output: undefined