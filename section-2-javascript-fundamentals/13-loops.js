// For Loop Example
for (let i = 0; i < 5; i++) {
  console.log(`For Loop Iteration: ${i}`);
}

// While Loop Example
let count = 0;
while (count < 5) {
  console.log(`While Loop Count: ${count}`);
  count++;
}

// Do-While Loop Example
let num = 0;
do {
  console.log(`Do-While Loop Number: ${num}`);
  num++;
} while (num < 5);

// For...of Loop Example (Iterating over an array)
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(`For...of Loop Fruit: ${fruit}`);
}

// ForEach Loop Example (Iterating over an array)
fruits.forEach((fruit) => {
  console.log(`Fruit: ${fruit}`);
});

// For...in Loop Example (Iterating over an object)
const person = { name: "John", age: 30, city: "New York" };
for (const key in person) {
  console.log(`For...in Loop Key: ${key}, Value: ${person[key]}`);
}
