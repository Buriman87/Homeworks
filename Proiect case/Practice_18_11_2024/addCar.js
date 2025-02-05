import {
  CHECK_INTERVEL,
  logoutInvalidSession,
  logOutTime,
  readFromLS,
  validateNewCarForm,
  writeToLS,
} from "./util.js";

const loggedUser = readFromLS("loggedUser") || {};
const users = readFromLS("users") || [];

if (!Object.keys(loggedUser).length) {
  location.assign("./home.html");
}

const sessionChceckInterval = setInterval(() => {
  logoutInvalidSession(loggedUser);
}, CHECK_INTERVEL);
if (logOutTime(loggedUser)) {
  clearInterval(sessionChceckInterval);
}

const carBrandInput = document.getElementById("carBrand");
const carModelInput = document.getElementById("carModel");
const fuelTypeInput = document.getElementById("fuelType");
const yearOfFabrication = document.getElementById("yearOfFabrication");
const carPriceInput = document.getElementById("carPrice");
const numberOfKmInput = document.getElementById("numberOfKm");
const error = document.getElementById("error");
const addNewCar = document.querySelector("#addNewCar");
const myListOfCars = document.querySelector("#myListOfCars");
const profile = document.querySelector("#profile");

myListOfCars.addEventListener("click", () => {
  location.assign("./myListings.html");
});

profile.addEventListener("click", () => {
  location.assign("./home.html");
});
if (!Object.keys(loggedUser).length) {
  location.assign("./login.html");
}
addNewCar.addEventListener("click", (e) => {
  console.log("Add Car button clicked.");
  e.preventDefault();

  const car = {
    id: crypto.randomUUID(),
    brand: carBrandInput.value.trim(),
    model: carModelInput.value.trim(),
    fuel: fuelTypeInput.value,
    year: new Date(yearOfFabrication.value).getTime(),
    price: Number(carPriceInput.value),
    kilometers: Number(numberOfKmInput.value),
    createdAt: Date.now(),
  };

  const isValidCar = validateNewCarForm(
    carBrandInput.value,
    carModelInput.value,
    yearOfFabrication.value,
    carPriceInput.value,
    numberOfKmInput.value
  );
  if (isValidCar) {
    return;
  }

  const cars = loggedUser.cars || [];

  cars.push(car);
  loggedUser.cars = cars;
  writeToLS("loggedUser", loggedUser);

  const userIndex = users.findIndex((user) => {
    return user.userNameInput === loggedUser.userNameInput;
  });
  if (userIndex >= 0) {
    users[userIndex] = loggedUser;
    writeToLS("users", users);
  }
  alert("Car is added successfully!");
  carBrandInput.value = "";
  carModelInput.value = "";
  yearOfFabrication.value = "";
  carPriceInput.value = "";
  numberOfKmInput.value = "";
});
