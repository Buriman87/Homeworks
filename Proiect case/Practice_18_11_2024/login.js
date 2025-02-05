import { loginErrors, readFromLS, writeToLS } from "./util.js";

const loginBtn = document.querySelector("#loginBtn");
const loginUsername = document.querySelector("#username");
const loginPassword = document.querySelector("#password");
const users = readFromLS("users") || [];
const error = document.querySelector("#error");
let errors = [];
const loggedUsers = readFromLS("loggedUser") || {};

if (Object.keys(loggedUsers).length > 0) {
  window.location.assign("./home.html");
}

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const usernameInput = loginUsername.value;
  const passwordInput = loginPassword.value;

  if (users) {
    errors = loginErrors(usernameInput, passwordInput);
  }
  if (errors.length > 0) {
    error.innerHTML = errors.join(". ");
    error.classList.add("incorect");
    e.preventDefault();
    return;
  }

  const loggedUser = users.find((user) => {
    return (
      user.userNameInput === usernameInput.trim() &&
      atob(user.passwordInput) === passwordInput
    );
  });

  if (loggedUser) {
    loggedUser.loginTime = Date.now();
    writeToLS("loggedUser", loggedUser);
    window.location.assign("./home.html");
  } else {
    error.innerText = "Invalid username or password.";
  }
});
