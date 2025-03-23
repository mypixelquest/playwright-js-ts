// Logical Operators in JavaScript

// AND (&&) Operator
console.log(true && true);   // true
console.log(true && false);  // false
console.log(false && false); // false

// OR (||) Operator
console.log(true || false);  // true
console.log(false || false); // false
console.log(true || true);   // true

// NOT (!) Operator
console.log(!true);  // false
console.log(!false); // true

// Combining Logical Operators
const age = 25;
const hasLicense = true;

if (age >= 18 && hasLicense) {
    console.log("You are eligible to drive.");
} else {
    console.log("You are not eligible to drive.");
}

// Short-circuit Evaluation
const name = null || "Default Name";
console.log(name); // "Default Name"

const isLoggedIn = true && "User is logged in";
console.log(isLoggedIn); // "User is logged in"

// Mixing Logical Operators
const isAdult = true;
const isStudent = false;

if (isAdult || isStudent && hasLicense) {
    console.log("You qualify for the discount.");
} else {
    console.log("You do not qualify for the discount.");
}