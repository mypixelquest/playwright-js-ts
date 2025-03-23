// Relational Operators
console.log(10 > 5); // true, because 10 is greater than 5
console.log(10 < 5); // false, because 10 is not less than 5
console.log(10 >= 10); // true, because 10 is equal to 10
console.log(10 <= 5); // false, because 10 is not less than or equal to 5

// Equality Operators
console.log(5 == "5"); // true, because == performs type coercion
console.log(5 === "5"); // false, because === checks for both value and type
console.log(5 != "5"); // false, because != performs type coercion
console.log(5 !== "5"); // true, because !== checks for both value and type

// Combining Relational and Equality Operators
let a = 10;
let b = 20;

console.log(a < b); // true
console.log(a == 10); // true
console.log(b !== 10); // true
console.log(a >= 5 && b <= 30); // true, because both conditions are true
console.log(a < 5 || b > 15); // true, because one condition is true
