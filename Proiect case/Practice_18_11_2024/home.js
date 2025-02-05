import {
  CHECK_INTERVEL,
  checkEdit,
  logoutInvalidSession,
  logOutTime,
  readFromLS,
  removeFromLS,
  writeToLS,
} from "./util.js";

const currentUserInfo = document.querySelector(".currentUser");
const logoutBtn = document.querySelector("#logout");
const loggedUser = readFromLS("loggedUser") || {};
const editProfil = document.querySelector("#editProfil");
const profilBtn = document.querySelector(".profile");
const profil = document.querySelector(".profil");
const closeProfile = document.querySelector("#closeProfile");
const users = readFromLS("users") || [];
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const age = document.querySelector("#age");
const error = document.querySelector("#error");
const addCarHome = document.querySelector("#addCarHome");
let errors = [];
const myListOfCars = document.querySelector("#myListOfCars");
const profile = document.querySelector("#profile");

const sessionChceckInterval = setInterval(() => {
  logoutInvalidSession(loggedUser);
}, CHECK_INTERVEL);
if (logOutTime(loggedUser)) {
  clearInterval(sessionChceckInterval);
}



myListOfCars.addEventListener("click", () => {
  location.assign("./myListings.html");
});

profile.addEventListener("click", () => {
  location.assign("./home.html");
});

if (!Object.keys(loggedUser).length) {
  location.assign("./login.html");
}
if (loggedUser) {
  const { userNameInput } = loggedUser;
  currentUserInfo.innerHTML = `Hello ${userNameInput} `;
}

logoutBtn.addEventListener("click", () => {
  removeFromLS("loggedUser");
  window.location.assign("./login.html");
});
addCarHome.addEventListener("click", () => {
  location.assign("./addCar.html");
});

profil.style.display = "none";

profilBtn.addEventListener("click", () => {
  location.assign("./myProfile.html")
  profil.style.display = "block";
  username.value = loggedUser.userNameInput || "";
  email.value = loggedUser.emailInput || "";
  firstname.value = loggedUser.firstNameInput || "";
  lastname.value = loggedUser.lastNameInput || "";
  age.value = loggedUser.ageInput || "";
});

closeProfile.addEventListener("click", () => {
  error.innerHTML = [];
  profil.style.display = "none";
});

editProfil.addEventListener("click", (event) => {
  const updateUser = {
    userNameInput: username.value,
    emailInput: email.value.trim(),
    firstNameInput: firstname.value.trim(),
    lastNameInput: lastname.value.trim(),
    passwordInput: btoa(password.value),
    ageInput: age.value,
  };
  if (updateUser) {
    errors = checkEdit(
      email.value.trim(),
      firstname.value.trim(),
      lastname.value.trim(),
      password.value.trim(),
      confirmPassword.value.trim(),
      users,
      username.value.trim()
    );
  }

  if (errors.length > 0) {
    error.innerHTML = errors.join(". ");
    error.classList.add("incorect");
    event.preventDefault();
    return;
  }

  const userIndex = users.findIndex((user) => {
    return user.userNameInput === loggedUser.userNameInput;
  });

  if (userIndex >= 0) {
    users[userIndex] = updateUser;
    writeToLS("users", users);
  }

  writeToLS("loggedUser", updateUser);
  alert("Profil actualizat");
});
