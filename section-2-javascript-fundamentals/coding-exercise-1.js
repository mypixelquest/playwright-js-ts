// Initial variables
let familySize = 2;
let plannedDistanceToDrive = 100;

// Function to recommend a car
function recommendedCar(familySize, plannedDistanceToDrive) {
    if (familySize <= 4 && plannedDistanceToDrive < 200) {
        return "Tesla";
    } else if (familySize <= 4 && plannedDistanceToDrive >= 200) {
        return "Toyota Camry";
    } else if (familySize > 4) {
        return "Minivan";
    }
}

// Example usage
console.log(recommendedCar(familySize, plannedDistanceToDrive)); // Output: Tesla