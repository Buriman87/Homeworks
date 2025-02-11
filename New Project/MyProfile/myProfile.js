import {
  readFromLS,
  writeToLS,
  editProfile,
  CHECK_INTERVAL,
  logOutTime,
  logoutInvalidSession,
} from "../Utils/utils.js";

let users = readFromLS("users") || [];
const loggedUsers = readFromLS("loggedUser") || {};
const clsBtn = document.getElementById("clsBtn");
clsBtn.addEventListener("click", () => {
  window.location.assign("../Homepage/homepage.html");
});
const sessionChceckInterval = setInterval(() => {
  logoutInvalidSession(loggedUsers);
}, CHECK_INTERVAL);
if (logOutTime(loggedUsers)) {
  clearInterval(sessionChceckInterval);
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

const usernameField = document.getElementById("username");
const phoneField = document.getElementById("phone");
const emailField = document.getElementById("email");
const firstNameField = document.getElementById("firstName");
const lastNameField = document.getElementById("lastName");
const secretWordField = document.getElementById("secretWord");
const saveButton = document.getElementById("saveBtn");
const loggedUserKey = "loggedUser";
const loggedUser = readFromLS(loggedUserKey);
console.log("Logged user data from localStorage:", loggedUser);
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  if (loggedUser) {
    usernameField.value = loggedUser.username || "";
    phoneField.value = loggedUser.phoneNumber || "";
    emailField.value = loggedUser.email || "";
    firstNameField.value = loggedUser.firstName || "";
    lastNameField.value = loggedUser.lastName || "";
  } else {
    console.error("No user data found in localStorage!");
  }
});

saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  const usernameValue = usernameField.value;
  const phoneValue = phoneField.value;
  const emailValue = emailField.value;
  const firstNameValue = firstNameField.value;
  const lastNameValue = lastNameField.value;
  const secretWordValue = secretWordField.value;
  if (
    editProfile(
      usernameValue,
      phoneValue,
      emailValue,
      firstNameValue,
      lastNameValue,
      users,
      loggedUser
    )
  ) {
    return;
  }
  if (secretWordValue.length > 3) {
    loggedUsers.secretWord = btoa(secretWordValue);
  } else if (secretWordValue.length < 3) {
    alert("Minimum 3 characters");
  }
  const userExist = users.find((user) => user.userId === loggedUsers.userId);
  console.log(userExist);
  if (userExist) {
    userExist.username = usernameValue;
    userExist.phoneNumber = phoneValue;
    userExist.email = emailValue;
    userExist.firstName = firstNameValue;
    userExist.lastName = lastNameValue;
    writeToLS("loggedUser", userExist);
    users = users.map((user) =>
      user.userId === userExist.userId ? userExist : user
    );
    console.log(users, userExist);
    writeToLS("users", users);
    alert("User profile was updated!");
  }
});
const resetPass = document.getElementById("passBtn");
resetPass.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.assign("../Recover_password/recover_password.html");
});
