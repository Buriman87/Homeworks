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
  
  const signupErrors = (
    username,
    email,
    firstname,
    lastname,
    password,
    age,
    users
  ) => {
    let errors = [];
    if (!username || username.trim().length < 4) {
      errors.push("Username is required and must be at least 4 characters long");
    }
    const usernameExists = users.some((user) => user.userNameInput === username);
    if (usernameExists) {
      errors.push("Username is already taken.");
    }
  
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || !emailRegex.test(email.trim())) {
      errors.push("A valid email is required");
    }
    const emailExists = users.some((user) => user.emailInput === email);
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
    if (!password || !passwordRegex.test(password)) {
      errors.push(
        "Password is required and must be at least 6 characters long, including an uppercase letter, a lowercase letter, a number, and a special character"
      );
    }
    if (!age || isNaN(age) || age < 16 || age > 90) {
      errors.push(
        "Age is required and must be older 16 years and younger than 90 years "
      );
    }
    return errors;
  };
  
  const loginErrors = (username, password) => {
    let errors = [];
    if (!username || !password) {
      errors.push(`<sup>*</sup> Complete each field of the form.`);
    }
    return errors;
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
  
  const validateNewCarForm = (brand, model, year, price, kilometers) => {
    let lettersRegex = /^[a-zA-Z]{2,}$/;
    let numberRegex = /^[0-9]+$/;
    let lettersNumbersRegex = /^[a-zA-Z0-9]{2,}$/;
  
    if (!lettersRegex.test(brand)) {
      return (error.innerHTML =
        "Brand must have at least 2 letters and only contain letters.");
    }
    if (!lettersNumbersRegex.test(model.trim())) {
      return (error.innerHTML =
        "Model must have at least 2 characters and no special symbols ");
    }
    const currentYear = new Date().getTime();
    const inputDate = new Date(year).getTime();
    if (inputDate < 1950 || inputDate > currentYear) {
      return (error.innerHTML = "Please enter of valid Year");
    }
    if (price < 100 || !numberRegex.test(price)) {
      return (error.innerHTML = "Car price must be at least 100");
    }
    if (kilometers < 0 || !numberRegex.test(kilometers)) {
      return (error.innerHTML = "Number of kilometers must be 0 or more.");
    }
    error.innerHTML = "";
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
      window.location.assign("./login.html")
    }
  };
  
  
  export {
    writeToLS,
    readFromLS,
    removeFromLS,
    signupErrors,
    loginErrors,
    checkEdit,
    validateNewCarForm,
    logOutTime,
    logoutInvalidSession,
    CHECK_INTERVEL,
    sessionTimeOut,
  };
  