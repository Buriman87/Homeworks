import { readFromLS, writeToLS, removeFromLS, logoutInvalidSession, logOutTime, CHECK_INTERVEL } from "./util.js";

const users = readFromLS("users") || [];
const loggedUser = readFromLS("loggedUser") || {};
const tableBody = document.querySelector("#tableBody");
const myListOfCars = document.querySelector("#myListOfCars");
const profile = document.querySelector("#profile");
const logoutBtn = document.querySelector("#logoutBtn");

const sessionChceckInterval = setInterval(() => {
  logoutInvalidSession(loggedUser);
}, CHECK_INTERVEL);
if (logOutTime(loggedUser)) {
  clearInterval(sessionChceckInterval);
}



logoutBtn.addEventListener("click", () => {
  removeFromLS("loggedUser");
  window.location.assign("./home.html");
});

myListOfCars.addEventListener("click", () => {
  location.assign("./myListings.html");
});

profile.addEventListener("click", () => {
  location.assign("./home.html");
});

if (!Object.keys(loggedUser).length) {
  location.assign("./login.html");
}

if (!loggedUser.cars || loggedUser.cars.length === 0) {
  tableBody.innerHTML = '<tr><td colspan="7">No cars listed yet.</td></tr>';
}

const displayCars = () => {
  const cars = loggedUser.cars
    .map((el) => el)
    .sort((a, b) => b.createdAt - a.createdAt);

  cars.forEach((car) => {
    const row = document.createElement("tr");
    const carYear = new Date(car.year).getFullYear();
    row.innerHTML = `
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.fuel}</td>
        <td>${carYear}</td
        <td><td>${car.price} </td></td>
        <td>${car.kilometers}</td>
        <td><button id="${car.id}">Remove</button></td>
      `;
    tableBody.appendChild(row);
  });
};

tableBody.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    const carId = e.target.getAttribute("id");
    const updatedCars = loggedUser.cars.filter((car) => car.id !== carId);

    loggedUser.cars = updatedCars;

    const userIndex = users.findIndex((user) => user.id === loggedUser.id);
    if (userIndex >= 0) {
      users[userIndex].cars = updatedCars;
    }
    writeToLS("loggedUser", loggedUser);
    writeToLS("users", users);

    e.target.closest("tr").remove();

    if (updatedCars.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="7">No cars listed yet.</td></tr>';
    }
  }
});
document.addEventListener("DOMContentLoaded", displayCars());
