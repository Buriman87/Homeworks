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

const signinBtn = document.querySelector("#signinBtn");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

const users = readFromLS("users") || [];

signinBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const foundUser = users.find((user) => {
    if (
      user.userNameInput === username.value &&
      atob(user.passwordInput) === password.value
    ) {
      return user;
    }
    return undefined;
  });
  if (foundUser) {
    foundUser.loginTime = Date.now();
    writeToLS("loggedUser", foundUser);
    location.assign("./Homepage.html");
  } else {
    //de pus mesaj de un P cu mesaj de eroare ca e gresit
  }
});
