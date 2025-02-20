import {
  readFromLS,
  removeFromLS,
  writeToLS,
  editProfile,
  CHECK_INTERVAL,
  logOutTime,
  logoutInvalidSession,
} from "../Utils/utils.js";

let users = readFromLS("users") || [];
const loggedUsers = readFromLS("loggedUser") || {};

if (!loggedUsers || Object.keys(loggedUsers).length === 0) { 
  window.location.assign("../Homepage/homepage.html");
}
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

// const deleteAccountBtn = document.getElementById("deleteUserBtn");
// function deleteUserFlats() {
//   // Get the logged-in user
//   const loggedUser = readFromLS("loggedUser");
//   let flats = readFromLS("flats") || [];

//   if (!loggedUser || !loggedUser.userId) {
//     console.error("No logged-in user found!");
//     return;
//   }

//   // Find all flats added by the user
//   const userFlats = flats.filter(
//     (flat) => String(flat.userID) === String(loggedUser.userId)
//   );

//   if (userFlats.length > 0) {
//     console.log("Flats to be deleted:", userFlats);
//   } else {
//     console.log("This user has not added any flats.");
//   }
//   // Remove user from favorite flats

//   flats.forEach((flat) => {
//     console.log(flat);
//     flat.favorites = flat.favorites.filter((el) => el !== loggedUser.userId);
//     console.log("se sterg fav");
//   });

//   // Remove user's flats from the flats array
//   flats = flats.filter(
//     (flat) => String(flat.userID) !== String(loggedUser.userId)
//   );

//   // Update local storage
//   writeToLS("flats", flats);
//   console.log("User's flats have been deleted successfully.");
// }

// deleteAccountBtn.addEventListener("click", (e) => {
//   e.preventDefault();

//   Swal.fire({
//     title: "Are you sure you want to delete your account?",
//     text: "You won't be able to revert this, and all the flats you added will be permanently removed!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // Delete flats added by the user
//       deleteUserFlats();

//       // Get logged-in user
//       const loggedUser = readFromLS("loggedUser");
//       if (!loggedUser || !loggedUser.userId) {
//         Swal.fire("Error!", "No logged-in user found.", "error");
//         return;
//       }

//       // Get all users and remove the logged-in user
//       let users = readFromLS("users") || [];
//       users = users.filter((user) => user.userId !== loggedUser.userId);

//       // Update localStorage
//       writeToLS("users", users); // Save updated users list
//       removeFromLS("loggedUser"); // Remove logged user

//       // Show success message and redirect
//       Swal.fire({
//         title: "Deleted!",
//         text: "Your account and flats have been removed.",
//         icon: "success",
//       }).then(() => {
//         window.location.assign("../Homepage/homepage.html"); // Redirect
//       });
//     }
//   });
// });

const deleteAccountBtn = document.getElementById("deleteUserBtn");

function deleteUserFlats(userId) {
  let flats = readFromLS("flats") || [];

  if (!userId) {
    console.error("No logged-in user ID found!");
    return;
  }

  // Remove user's flats
  flats = flats.filter((flat) => String(flat.userID) !== String(userId));

  // Remove user from favorites in other flats
  flats.forEach((flat) => {
    flat.favorites = flat.favorites.filter((favUserId) => favUserId !== userId);
  });

  // Update localStorage
  writeToLS("flats", flats);
  console.log("User's flats have been deleted successfully.");
}

deleteAccountBtn.addEventListener("click", (e) => {
  e.preventDefault();

  Swal.fire({
    title: "Are you sure you want to delete your account?",
    text: "This action is permanent. All your flats and associated data will be removed.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Get logged-in user before removing it
      const loggedUser = readFromLS("loggedUser");
      if (!loggedUser || !loggedUser.userId) {
        Swal.fire("Error!", "No logged-in user found.", "error");
        return;
      }
      const userId = loggedUser.userId;

      // Delete all flats added by the user
      deleteUserFlats(userId);

      // Remove user from users array
      let users = readFromLS("users") || [];
      users = users.filter((user) => user.userId !== userId);
      writeToLS("users", users);

      // Remove loggedUser from localStorage
      removeFromLS("loggedUser");

      // Show success message and redirect
      Swal.fire({
        title: "Deleted!",
        text: "Your account and associated flats have been removed.",
        icon: "success",
      }).then(() => {
        window.location.assign("../Homepage/homepage.html"); // Redirect
      });
    }
  });
});

const inactiveBtn = document.getElementById("inactivateAccount");
function makeAccountInactive() {
  const updatedUser = users.find((user) => user.userId === loggedUser.userId);
  updatedUser.isActive = false;
  const updatedUsers = users.map((user) =>
    user.userId === loggedUser.userId ? updatedUser : user
  );
  alert("Your account has been set to inactive.");
  writeToLS("users", updatedUsers);
  removeFromLS("loggedUser");
  window.location.assign("../Homepage/homepage.html");
}

// Attach event listener to the button
inactiveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  makeAccountInactive();
});
