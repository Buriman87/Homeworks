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

function checkUsername(username){
  const userArray = readFromLS("users") || [];
  return userArray.some((user)=>user.userNameInput==username);
}

function checkEmail(email){
  const userArray = readFromLS("users") || [];
return userArray.some((user)=>user.emailInput==email)
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
  checkEmail
};
