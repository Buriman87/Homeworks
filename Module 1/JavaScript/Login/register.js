import { readFromLS, removeFromLS, writeToLS } from "./util.js";

// const x = 3;
// console.log(x);

// const button = document.querySelector("#btn");
// const paragraph = document.querySelector(".paragraph");

// button.addEventListener("click", () => {
//   writeToLS("gigi", x);
// });

// paragraph.innerText = readFromLS("gigi");

// console.log(removeFromLS("gigi"));

const registerBtn = document.querySelector("#registerBtn");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const password = document.querySelector("#password");
const age = document.querySelector("#age");
const error = document.querySelector("#error");
const usersToShow = document.querySelector(".users");

const users = readFromLS("users") || [];
const loggedUsers = readFromLS("loggedUser") || false;

// if (loggedUsers) {
//   window.location.assign("./Homepage.html");
// }

console.log(loggedUsers);
users.forEach((user) => {
  let el = document.createElement("p");
  el.innerText = user.userNameInput;
  usersToShow.appendChild(el);
});

//Vrem sa stocam in local storage un array cu userii care se inregistraza
// + un obiect care retine utilizatorul curent logat
// TREBUIE SA VALIDAM LUCRURI

//username minim 4 caractere
//validare email
//fisrtname, lastname minim 2 caractere
//password minim 6 caractere, minim o litera mare, minim o litera mica, minim 1 cifra, minim un caracter special
//username si email sunt unice! Nu pot avea 2 utilizatori cu acelasi username si email
//   const upperCaseRegex = /[A-Z]/;
//  const lowerCaseRegex = /[a-z]/;
//  const numberRegex = /[0-9]/;
//  const specialCharRegex = /[!@#]/;
registerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const userInfo = {
    userNameInput: username.value,
    emailInput: email.value,
    firstNameInput: firstname.value,
    lastNameInput: lastname.value,
    passwordInput: btoa(password.value),
    ageInput: age.value,
  };
  console.log(">>userInfo: ", userInfo);
  console.log(atob(userInfo.passwordInput) === "gigi");
  if (
    userInfo.userNameInput.length === 0 ||
    userInfo.emailInput.length === 0 ||
    userInfo.firstNameInput.length === 0 ||
    userInfo.lastNameInput.length === 0 ||
    userInfo.passwordInput.length === 0 ||
    userInfo.ageInput.length === 0
  ) {
    error.classList.add("red");
    error.innerHTML = `<sup>*</sup> Complete each field of the form.`;
    return;
  }
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!re.test(userInfo.emailInput)) {
    error.classList.add("red");
    error.innerHTML = `<sup>*</sup> Invalid Email`;
  }
  users.push(userInfo);
  writeToLS("users", users);
  writeToLS("loggedUser", userInfo);
  let el = document.createElement("p");
  el.innerText = userInfo.userNameInput;
  usersToShow.appendChild(el);
});
