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

const sessionTimeOut = 1 * 10 * 1000; //minut x secunda x milisecunda
const CHECK_INTERVAL = 5 * 1000;

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

const logOutTime = (loggedUser) => {
  const currentTime = Date.now();
  const validSesion = currentTime > loggedUser.loginTime + sessionTimeOut;
  return validSesion;
};

let logOutTrigger = false;
const logoutInvalidSession = async (loggedUser) => {
  if (!logOutTrigger && logOutTime(loggedUser)) {
    logOutTrigger = true;
    await Swal.fire({
      title: "Your session time has expired.",
      text: "Do you want to remain logged in?",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        loggedUser.loginTime = loggedUser.loginTime + sessionTimeOut;
        location.reload();
      } else if (result.isDenied) {
        removeFromLS("loggedUser");
        window.location.assign("../Login/login.html");
      }
    });
    // removeFromLS("loggedUser");
    // window.location.assign("../Login/login.html");
  }
};

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
  script.defer = true;
  if (isModule) {
    script.type = "module";
  }

  document.head.appendChild(script);
}

function toggleFavorite(flatId) {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (!loggedUser || !loggedUser.userId) {
    console.error("No user is logged in.");
    return;
  }

  let flats = JSON.parse(localStorage.getItem("flats")) || [];

  const flatIndex = flats.findIndex((flat) => flat.id === flatId);

  if (flatIndex === -1) {
    console.error("Flat not found in localStorage.");
    return;
  }

  if (!flats[flatIndex].favorites.includes(loggedUser.userId)) {
    flats[flatIndex].favorites.push(loggedUser.userId);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Flat added succesfuly!",
    });
    console.log(`User ${loggedUser.userId} added to favorites.`);
  } else {
    let favorites = flats[flatIndex].favorites;
    favorites = favorites.filter((e) => e !== loggedUser.userId);

    flats[flatIndex].favorites = favorites;
    console.log(`User ${loggedUser.userId} is already in favorites.`);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Flat removed succesfuly!",
    });
  }

  localStorage.setItem("flats", JSON.stringify(flats));
}

export {
  toggleFavorite,
  writeToLS,
  readFromLS,
  removeFromLS,
  CHECK_INTERVAL,
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
