const writeToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const readFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const removeFromLS = (key) => {
  if (readFromLS(key)) {
    localStorage.removeItem(key);
    return true;
  }
  return false;
};

class UserData {
  constructor(
    username,
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    secretWord,
    phoneNumber
  ) {
    (this.email = email),
      (this.username = username),
      (this.phoneNumber = phoneNumber),
      (this.secretWord = secretWord),
      (this.password = password),
      (this.firstName = firstName),
      (this.lastName = lastName),
      (this.dateOfBirth = dateOfBirth),
      (this.userId = crypto.randomUUID());
  }
  updateLoginTime = () => {
    this.loginTime = Date.now();
  };
}
const recoverPass = (password, confirmPassword) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!password || !passwordRegex.test(password)) {
    return (errorMsg.innerHTML = "Criterias not ok!");
  }

  if (confirmPassword !== password) {
    return (errorMsg.innerHTML = "Password do not match!");
  }
};

const editProfile = (
  username,
  phoneNumber,
  email,
  firstname,
  lastname,
  users,
  loggedUser
) => {
  if (!username || username.trim().length < 6) {
    return (errorMessage.innerHTML =
      "Username must have at least 6 characters long are required");
  }
  const phoneExists = users.some(
    (user) =>
      user.phoneNumber === phoneNumber && user.userId !== loggedUser.userId
  );
  if (phoneExists) {
    return (errorMessage.innerHTML = "Phone number already taken!");
  }
  const usernameExists = users.some(
    (user) => user.username === username && user.userId !== loggedUser.userId
  );
  if (usernameExists) {
    return (errorMessage.innerHTML = "Username already taken!");
  }

  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email || !emailRegex.test(email.trim())) {
    return (errorMessage.innerHTML = "Enter a valid e-mail!");
  }
  const emailExists = users.some(
    (user) => user.email === email && user.userId !== loggedUser.userId
  );
  if (emailExists) {
    return (errorMessage.innerHTML = "E-mail already used!");
  }
  if (!firstname || firstname.trim().length < 2) {
    return (errorMessage.innerHTML = "First Name is required!");
  }
  if (!lastname || lastname.trim().length < 2) {
    return (errorMessage.innerHTML = "Last Name is required!");
  }
};
const signupErrors = (
  username,
  phoneNumber,
  secretWord,
  email,
  firstname,
  lastname,
  password,
  confirmPassword,
  age,
  users
) => {
  if (!username || username.trim().length < 6) {
    return (errorMessage.innerHTML =
      "Username must have at least 6 characters long are required");
  }
  const phoneExists = users.some((user) => user.phoneNumber === phoneNumber);
  if (phoneExists) {
    return (errorMessage.innerHTML = "Phone number already taken!");
  }
  const usernameExists = users.some((user) => user.username === username);
  if (usernameExists) {
    return (errorMessage.innerHTML = "Username already taken!");
  }

  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email || !emailRegex.test(email.trim())) {
    return (errorMessage.innerHTML = "Enter a valid e-mail!");
  }
  const emailExists = users.some((user) => user.email === email);
  if (emailExists) {
    return (errorMessage.innerHTML = "E-mail already used!");
  }
  if (!firstname || firstname.trim().length < 2) {
    return (errorMessage.innerHTML = "First Name is required!");
  }
  if (!lastname || lastname.trim().length < 2) {
    return (errorMessage.innerHTML = "Last Name is required!");
  }
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!password || !passwordRegex.test(password)) {
    return (errorMessage.innerHTML = "Criterias not ok!");
  }

  if (confirmPassword !== password) {
    return (errorMessage.innerHTML = "Password do not match!");
  }
  if (!calculateAge(age) || !age) {
    return (errorMessage.innerHTML = "Age outside the allowed interval!");
  }
  if (
    !(
      Number(phoneNumber) &&
      phoneNumber.length >= 10 &&
      phoneNumber.length < 18
    )
  ) {
    return (errorMessage.innerHTML = "A valid phone number is required!");
  }

  if (secretWord.length < 3) {
    return (errorMessage.innerHTML =
      "The secret word used for password recovery must be at least 3 characters!");
  }
  errorMessage.innerHTML = "";
};
const calculateAge = (timeStamp) => {
  const today = new Date();
  const birthOfDate = new Date(timeStamp);

  let age = today.getFullYear() - birthOfDate.getFullYear();
  const monthDiff = today.getMonth() - birthOfDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthOfDate.getDate())
  ) {
    age--;
  }

  if (age < 18 || age > 120) {
    return;
  }
  return age;
};

const checkEdit = (
  email,
  firstname,
  lastname,
  password,
  confirmPassword,
  users,
  username
) => {
  let errors = [];
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push("A valid email is required");
  }

  const emailExists = users.some(
    (user) => user.emailInput === email && user.userNameInput !== username
  );
  if (emailExists) {
    errors.push("Email is already taken.");
  }

  if (!firstname || firstname.trim().length < 2) {
    errors.push("First Name is required");
  }
  if (!lastname || lastname.trim().length < 2) {
    errors.push("Last Name is required");
  }
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!password || !passwordRegex.test(password.trim())) {
    errors.push(
      "Password is required and must be at least 6 characters long, including an uppercase letter, a lowercase letter, a number, and a special character"
    );
  }
  if (password !== confirmPassword) {
    errors.push("password and confirm password must be the same");
  }

  return errors;
};
const sessionTimeOut = 100 * 60 * 1000;
const logOutTime = (loggedUser) => {
  const currentTime = Date.now();
  const validSesion = currentTime > loggedUser.loginTime + sessionTimeOut;
  return validSesion;
};

const CHECK_INTERVEL = 5 * 1000;
const logoutInvalidSession = (loggedUser) => {
  if (logOutTime(loggedUser)) {
    alert(`Session time out!`);
    removeFromLS("loggedUser");
    window.location.assign("./login.html");
  }
};
// const loadScript = (path) => {
//   const script = document.createElement("script");
//   script.src = path;
//   // script.onload = console.log("new script loaded!");
//   // script.onerror = console.log("error loading new script!");
//   document.head.appendChild(script);
// };

function replaceScript(src, isModule = false) {
  // Check if a script with the same src already exists
  const existingScript = document.querySelector(`script[src="${src}"]`);
  if (existingScript) {
    // Remove the existing script
    existingScript.remove();
  }

  // Create a new script element
  const script = document.createElement("script");
  script.src = src;
  script.defer = true; // Ensure the script is deferred
  if (isModule) {
    script.type = "module"; // Set the script as a module
  }

  // Append the new script to the document head
  document.head.appendChild(script);
}
// const favProcess = document.getElementById("favIcon");
// const toggleFav()
function toggleFavorite(flatId) {
  // Retrieve logged user from localStorage
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (!loggedUser || !loggedUser.userId) {
    alert("You must be logged in to favorite a flat.");
    return;
  }

  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Retrieve flats from localStorage
  const flats = JSON.parse(localStorage.getItem("flats")) || [];

  // Find the logged user's ID from users list
  const user = users.find((user) => user.userId === loggedUser.userId);
  if (!user) {
    alert("User not found.");
    return;
  }

  const userId = user.userId; // Extract the correct userId

  // Find the flat by ID (using the correct 'id' key)
  const flatIndex = flats.findIndex((flat) => flat.id === id);
  if (flatIndex === -1) {
    console.error("Flat not found.");
    return;
  }

  // Ensure the favorites array exists in the flat object
  if (!Array.isArray(flats[flatIndex].favorites)) {
    flats[flatIndex].favorites = [];
  }

  // Toggle favorite: Add if not present, remove if already favorited
  if (!flats[flatIndex].favorites.includes(userId)) {
    flats[flatIndex].favorites.push(userId);
    alert("Flat added to favorites!");
  } else {
    flats[flatIndex].favorites = flats[flatIndex].favorites.filter(
      (id) => id !== userId
    );
    alert("Flat removed from favorites.");
  }

  // Save updated flats back to localStorage
  localStorage.setItem("flats", JSON.stringify(flats));
}

export {
  toggleFavorite,
  writeToLS,
  readFromLS,
  removeFromLS,
  CHECK_INTERVEL,
  UserData,
  sessionTimeOut,
  signupErrors,
  checkEdit,
  logOutTime,
  logoutInvalidSession,
  // loadScript,
  replaceScript,
  recoverPass,
  editProfile,
};
