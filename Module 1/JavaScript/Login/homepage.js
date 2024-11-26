import { readFromLS } from "./util.js";
console.log()

const currentUserInfo = document.querySelector(".currentUser");

const loggedUser = readFromLS("loggedUser") || false;

console.log(loggedUser);
// if (!loggedUser) {
//   location.assign("./register.html");
// }
const { firstNameInput, emailInput } = loggedUser;

currentUserInfo.innerHTML = `Hello ${firstNameInput} ${emailInput}`;

document.querySelector(".hamburger").addEventListener('click', toggleMenu)
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
  // navLinks.style.display="flex"
  console.log("ceva")
}