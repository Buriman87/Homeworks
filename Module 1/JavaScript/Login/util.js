const sessionTimeOut = 0.3 * 60 * 1000;

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
//tre facute si fnct pt validari login
function isValidUsername(username) {
  if (username.length >= 4) {
    return true;
  } else {
    alert("Something went wrong");
  }
}

function isValidPassword(password) {
  //minim 6 caractere
  //minimc 1 liter capital
  //minim 1 litera mica
  //minim 1 cifra
  //minim un caracter special
  const passwordParam =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return passwordParam.test(password);
}

function isValidName(name) {
  if (name.length > 2) {
    return true;
  } else {
    alert("Invalid name format");
  }
}

function isValidEmail(email) {
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function checkUsername(username) {
  const userArray = readFromLS("users") || [];
  return userArray.some((user) => user.userNameInput == username);
}

function checkEmail(email) {
  const userArray = readFromLS("users") || [];
  return userArray.some((user) => user.emailInput == email);
}

function isSessionValid(loggedUser) {
  const currentTime = Date.now();
  const validSession = currentTime < loggedUser.loginTime + sessionTimeOut;
  return validSession;
}

const CHECK_INTERVAL = 5000;

function logoutInvalidSession(loggedUser,intervalID) {
  console.log("gigi");
  if (!isSessionValid(loggedUser)) {
    clearInterval(intervalID);
    alert(`Session time out!`);
    removeFromLS("loggedUser");
    console.log(loggedUser);
    location.assign("./login.html");
  }
}

export {
  writeToLS,
  readFromLS,
  removeFromLS,
  isValidPassword,
  isValidEmail,
  isValidName,
  isValidUsername,
  checkUsername,
  checkEmail,
  sessionTimeOut,
  CHECK_INTERVAL,
  logoutInvalidSession,
  isSessionValid,
};
