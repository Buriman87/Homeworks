import { readFromLS } from "./util.js";
console.log();

const currentUserInfo = document.querySelector(".currentUser");

const loggedUser = readFromLS("loggedUser") || false;

console.log(loggedUser);
// if (!loggedUser) {
//   location.assign("./register.html");
// }
const { firstNameInput, emailInput } = loggedUser;

function homePageCheckStatus() {
  const loggedUser = readFromLS("loggedUser") || false;
  const currentUserInfo = document.querySelector(".currentUser");
  const { firstNameInput, emailInput } = loggedUser;
  if (!loggedUser) {
    currentUserInfo.innerHTML = `Hello! Please log in or register!`;
  } else {
    currentUserInfo.innerHTML = `Hello ${firstNameInput} ${emailInput}`;
  }
}
homePageCheckStatus()


document.querySelector(".hamburger").addEventListener("click", toggleMenu);
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
  // navLinks.style.display="flex"
  console.log("ceva");
}
