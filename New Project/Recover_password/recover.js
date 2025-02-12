import {
  readFromLS,
  writeToLS,
  UserData,
  recoverPass,
} from "../Utils/utils.js";
let users = readFromLS("users") || [];
const loggedUser = readFromLS("loggedUser") || {};
const recoverBtn = document.getElementById("recoverBtn");
const errorMsg = document.getElementById("errorMsg");
const cancelBtn = document.getElementById("cancelBtn");

// if (Object.keys(loggedUser).length > 0) {
//   window.location.assign("../Homepage/homepage.html");
// }

cancelBtn.addEventListener("click", () => {
  window.location.assign("../Homepage/homepage.html");
});

recoverBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const secretWord = document.getElementById("secretWord").value;
  const newPass = document.getElementById("newPass").value;
  const confPass = document.getElementById("confPass").value;
  const userExist = users.find(
    (user) =>
      (user.username === username ||
        user.phoneNumber === username ||
        user.email === username) &&
      user.secretWord === btoa(secretWord)
  );
  const validPass = recoverPass(newPass, confPass);
  if (validPass) {
    return;
  }
  if (userExist) {
    userExist.password = btoa(newPass); // Encrypt and update password
    userExist.isActive = true; // ✅ Reactivate the user
    userExist.loginTime = Date.now();

    alert("Your password has been reset. You can now log in!");
    writeToLS("loggedUser", userExist);
    users = users.map((user) =>
      user.userId === userExist.userId ? userExist : user
    );
    writeToLS("users", users);
    window.location.assign("../Homepage/homepage.html");
  } else {
    errorMsg.innerText = "Invalid combination!";
  }
});
