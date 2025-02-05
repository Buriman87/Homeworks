import {
  readFromLS,
  removeFromLS,
  logoutInvalidSession,
  CHECK_INTERVAL,
} from "./util.js";
console.log();

const currentUserInfo = document.querySelector(".currentUser");

const loggedUser = readFromLS("loggedUser") || false;

// const sessionCheckInterval = setInterval(
//   () => logoutInvalidSession(loggedUser, sessionCheckInterval),
//   CHECK_INTERVAL
// );

const { firstNameInput, emailInput } = loggedUser;

function homePageCheckStatus() {
  const loggedUser = readFromLS("loggedUser") || false;
  const currentUserInfo = document.querySelector(".currentUser");
  const { firstNameInput, emailInput } = loggedUser;
  if (!loggedUser) {
    currentUserInfo.innerHTML = `Hello! Please log in or register!`;
  } else {
    currentUserInfo.innerHTML = `Hello ${firstNameInput}! We are very happy to have you back!`;
  }
}
homePageCheckStatus();

const navLinks = document.getElementById("nav-links");
const loggedLinks = document.getElementById("logged-links");

if (loggedUser) {
  navLinks.style.display = "none";
  loggedLinks.style.display = "block";

  const profileLink = document.createElement("a");
  profileLink.href = "./myprofile.html";
  profileLink.textContent = "Profile";
  loggedLinks.appendChild(profileLink);
  const logoutLink = document.createElement("a");
  logoutLink.href = "#";
  logoutLink.textContent = "Logout";
  logoutLink.onclick = function () {
    localStorage.removeItem("loggedUser");
    window.location.reload();
  };
  logoutLink.style.marginLeft = "15px";
  loggedLinks.appendChild(logoutLink);
}
