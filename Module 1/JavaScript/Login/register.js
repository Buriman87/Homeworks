import {
  readFromLS,
  removeFromLS,
  writeToLS,
  isValidPassword,
  isValidEmail,
  isValidName,
  isValidUsername,
  checkUsername,
  checkEmail,
} from "./util.js";

const users = readFromLS("users") || [];
const loggedUsers = readFromLS("loggedUser") || {};

if (Object.keys(loggedUsers).length > 0) {
  window.location.assign("./Homepage.html");
}
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

console.log(loggedUsers);
// users.forEach((user) => {
//   let el = document.createElement("p");
//   el.innerText = user.userNameInput;
//   usersToShow.appendChild(el);
// });

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

  // validarile din util
  if (!isValidUsername(userInfo.userNameInput)) {
    error.classList.add("red");
    error.innerHTML = `<sup>*</sup> Username must be at least 4 characters long.`;
    return;
  }

  if (checkUsername(userInfo.userNameInput)) {
    error.classList.add("red");
    error.innerHTML = `<sup>*</sup> Username already exists!`;
    return;
  }
  if (
    !isValidName(userInfo.firstNameInput) ||
    !isValidName(userInfo.lastNameInput)
  ) {
    error.classList.add("red");
    error.innerHTML = `<sup>*</sup> First / Last Names must be longer than 2 characters.`;
    return;
  }

  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!emailRegex.test(userInfo.emailInput)) {
    error.classList.add("red");
    error.innerHTML = `<sup>*</sup> Invalid Email`;
    return;
  }
  if (checkEmail(userInfo.emailInput)) {
    error.classList.add("red");
    error.innerHTML = `<sup>*</sup> Email already exists!`;
    return;
  }
  if (!isValidPassword(atob(userInfo.passwordInput))) {
    error.classList.add("red");
    error.innerHTML = `<sup>*</sup> Password must be at least 6 characters long, contain 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.`;
    return;
  }

  // daca toate sunt ok=>scrie in local storage
  users.push(userInfo);
  writeToLS("users", users);
  writeToLS("loggedUser", userInfo);
  location.assign("./Homepage.html");

  // let el = document.createElement("p");
  // el.innerText = userInfo.userNameInput;
  // usersToShow.appendChild(el);
});
