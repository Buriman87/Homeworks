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

const deleteAccountBtn = document.getElementById("deleteUserBtn");
function deleteUserFlats() {
  // Get the logged-in user
  const loggedUser = readFromLS("loggedUser");
  let flats = readFromLS("flats") || [];

  if (!loggedUser || !loggedUser.userId) {
    console.error("No logged-in user found!");
    return;
  }

  // Find all flats added by the user
  const userFlats = flats.filter(
    (flat) => String(flat.userID) === String(loggedUser.userId)
  );

  if (userFlats.length > 0) {
    console.log("Flats to be deleted:", userFlats);
  } else {
    console.log("This user has not added any flats.");
  }
  // Remove user from favorite flats

  flats.forEach((flat) => {
    console.log(flat);
    flat.favorites = flat.favorites.filter((el) => el !== loggedUser.userId);
    console.log("se sterg fav");
  });

  // Remove user's flats from the flats array
  flats = flats.filter(
    (flat) => String(flat.userID) !== String(loggedUser.userId)
  );

  // Update local storage
  writeToLS("flats", flats);
  console.log("User's flats have been deleted successfully.");
}

// Run this function when the delete button is clicked
deleteAccountBtn.addEventListener("click", (e) => {
  e.preventDefault();
  deleteUserFlats(); // Delete only user's flats
});

const inactiveBtn = document.getElementById("inactivateAccount");
function makeAccountInactive() {
  // Get the logged-in user and users list
  const loggedUser = readFromLS("loggedUser");
  let users = readFromLS("users") || [];

  if (!loggedUser || !loggedUser.userId) {
    alert("No logged-in user found!");
    return;
  }

  // Find the user in the users array and set isActive to false
  users = users.map((user) => {
    if (String(user.userId) === String(loggedUser.userId)) {
      user.isActive = false; // Change isActive status
    }
    return user;
  });

  // Update local storage with the modified users list
  writeToLS("users", users);

  // Also update loggedUser's status
  loggedUser.isActive = false;
  writeToLS("loggedUser", loggedUser);

  alert("Your account has been set to inactive.");
}

// Attach event listener to the button
inactiveBtn.addEventListener("click", makeAccountInactive);
