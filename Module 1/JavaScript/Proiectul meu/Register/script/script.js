import { readFromLS, signupErrors, writeToLS } from "../script/utils.js";

const registerBtn = document.querySelector("#registerBtn");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const password = document.querySelector("#password");
const age = document.querySelector("#age");
const error = document.querySelector("#error");
const closeBtn = document.querySelector("#closeBtn");

closeBtn.addEventListener("click", () => {
    console.log('test')
  window.location.href = "../Homepage/homepage.html";
});

const users = readFromLS("users") || [];
const loggedUsers = readFromLS("loggedUser") || {};

let errors = [];

if (Object.keys(loggedUsers).length > 0) {
  window.location.assign("./home.html");
}

registerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  errors = [];
  const userInfo = {
    userNameInput: username.value,
    emailInput: email.value,
    firstNameInput: firstname.value,
    lastNameInput: lastname.value,
    passwordInput: btoa(password.value),
    ageInput: age.value,
    loginTime: Date.now(),
  };

  if (users) {
    errors = signupErrors(
      username.value,
      email.value,
      firstname.value,
      lastname.value,
      password.value,
      age.value,
      users
    );
  }

  if (errors.length > 0) {
    error.innerHTML = errors.join(". ");
    error.classList.add("incorect");
    event.preventDefault();
    return;
  }

  users.push(userInfo);
  writeToLS("users", users);
  writeToLS("loggedUser", userInfo);
  window.location.assign("./home.html");
});
