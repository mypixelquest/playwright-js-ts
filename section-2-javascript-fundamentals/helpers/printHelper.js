export function printAge(age) {
  console.log(`Age: ${age}`);
}

// 15-class-methods

class CustomerDetails {
  printFirstName(printFirstName) {
    console.log(`First Name: ${printFirstName}`);
  }

  printLastName(printLastName) {
    console.log(`Last Name: ${printLastName}`);
  }
}

export const customerDetails = new CustomerDetails();
