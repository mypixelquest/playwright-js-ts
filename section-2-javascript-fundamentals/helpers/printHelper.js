export function printAge(age) {
  console.log(`Age: ${age}`);
}

// 15-class-methods

/**
 * A class to handle printing customer details such as first name and last name.
 */
class CustomerDetails {
  /**
   * Prints the first name of the customer to the console.
   * @param {string} printFirstName - The first name of the customer to print.
   */
  printFirstName(printFirstName) {
    console.log(`First Name: ${printFirstName}`);
  }

  /**
   * Prints the last name of the customer to the console.
   * @param {string} printLastName - The last name of the customer to print.
   */
  printLastName(printLastName) {
    console.log(`Last Name: ${printLastName}`);
  }
}

export const customerDetails = new CustomerDetails();
