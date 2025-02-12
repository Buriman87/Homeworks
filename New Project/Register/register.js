import {
  readFromLS,
  signupErrors,
  UserData,
  writeToLS,
} from "../Utils/utils.js";

const users = readFromLS("users") || [];
const loggedUsers = readFromLS("loggedUser") || {};
const clsBtn = document.getElementById("clsBtn");
clsBtn.addEventListener("click", () => {
  window.location.assign("../Homepage/homepage.html");
});

if (Object.keys(loggedUsers).length > 0) {
  window.location.assign("../Homepage/homepage.html");
}

const themeBtn = document.querySelector("#sliderToggle");

const toggleTxt = document.querySelector(".toggleTxt");
themeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("darkMode")) {
    document.body.classList.remove("darkMode");
    toggleTxt.innerHTML = "Light mode";
  } else {
    document.body.classList.add("darkMode");
    toggleTxt.innerHTML = "Dark mode";
  }
});

const registerBtn = document.querySelector("#registerBtn");
registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userNameInput = document.querySelector("#username").value;
  const phoneInput = document.querySelector("#phone").value;
  const emailInput = document.querySelector("#email").value;
  const firstNameInput = document.querySelector("#firstName").value;
  const lastNameInput = document.querySelector("#lastName").value;
  const passwordInput = document.querySelector("#password").value;
  const dateOfBirth = document.querySelector("#age").value;
  const confirmPasswordInput = document.querySelector("#confirmPassword").value;
  const secretWordInput = document.querySelector("#secretWord").value;

  const dateOfBirthInput = new Date(dateOfBirth).getTime();

  const registerValid = signupErrors(
    userNameInput,
    phoneInput,
    secretWordInput,
    emailInput,
    firstNameInput,
    lastNameInput,
    passwordInput,
    confirmPasswordInput,
    dateOfBirthInput,
    users
  );
  if (registerValid) {
    return;
  }
  const user = new UserData(
    userNameInput,
    emailInput,
    btoa(passwordInput),
    firstNameInput,
    lastNameInput,
    dateOfBirthInput,
    btoa(secretWordInput),
    phoneInput,
    true
  );
  user.registrationDate = Date.now();
  users.push(user);
  writeToLS("users", users);
  user.loginTime = Date.now();
  writeToLS("loggedUser", user);
  window.location.assign("../Homepage/homepage.html");
});
