// Function declaration
function helloOne() {
    console.log("Hello One");
}
helloOne();

// Function expression (anonymous function)
const helloTwo = function () {
    console.log("Hello Two");
};

helloTwo();

// Arrow function (ES6 syntax)
const helloThree = () => {
    console.log("Hello Three");
};

helloThree();

// Function with parameters
function greet(name) {
    console.log(`Hello ${name}`);
}

greet("John");

// Function with a return value
function multiplyByTwo(num) {
    return num * 2;
}

const result = multiplyByTwo(20);
console.log(result);

// Import a specific function from a helper file
import { printAge } from "./helpers/printHelper.js";
printAge(5);

// Import all exports from a helper file
import * as helper from "./helpers/printHelper.js";
helper.printAge(10);
