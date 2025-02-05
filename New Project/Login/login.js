import { readFromLS, writeToLS, UserData } from "../Utils/utils.js";
const users = readFromLS("users") || [];
const loggedUser = readFromLS("loggedUser") || {};
const loginBtn = document.getElementById("loginBtn");
const errorLogin = document.getElementById("errorLogin");
const forgotPass = document.getElementById("forgotPass");
if (Object.keys(loggedUser).length > 0) {
  window.location.assign("../Homepage/homepage.html");
}

forgotPass.addEventListener("click", () => {
  window.location.assign("../Recover_password/recover_password.html");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(users);
  const userExist = users.find(
    (user) =>
      (user.username === username ||
        user.phoneNumber === username ||
        user.email === username) &&
      user.password === btoa(password)
  );
  if (userExist) {
    alert("Login");
    userExist.loginTime = Date.now();
    writeToLS("loggedUser", userExist);
    window.location.assign("../Homepage/homepage.html");
  } else {
    errorLogin.innerText = "Invalid combination!";
  }
});
