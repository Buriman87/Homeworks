import { readFromLS } from "./util.js";

const currentUserInfo = document.querySelector(".currentUser");

const loggedUser = readFromLS("loggedUser") || false;

console.log(loggedUser);

function homePageCheckStatus() {
  const loggedUser = readFromLS("loggedUser") || false;
  const currentUserInfo = document.querySelector(".currentUser");

  if (!loggedUser) {
    currentUserInfo.innerHTML = `Hello! Please log in or register!`;
  } else {
    currentUserInfo.innerHTML = `Hello ${loggedUser.firstNameInput}! We are very happy to have you back!`;
    displayUserForm(loggedUser);
  }
}

homePageCheckStatus();

function displayUserForm(user) {
  const formContainer = document.querySelector("#userForm"); 

  const form = document.createElement("form");

  const fields = [
    { label: "First Name", name: "firstNameInput", value: user.firstNameInput, editable: false },
    { label: "Last Name", name: "lastNameInput", value: user.lastNameInput, editable: false },
    { label: "Email", name: "emailInput", value: user.emailInput, editable: false },
    { label: "Username", name: "userNameInput", value: user.userNameInput, editable: false },
    { label: "Age", name: "ageInput", value: user.ageInput, editable: true }, 
  ];

  fields.forEach(field => {
    const label = document.createElement("label");
    label.textContent = field.label;
    label.setAttribute("for", field.name);

    const input = document.createElement("input");
    input.type = field.name === "ageInput" ? "number" : "text"; 
    input.id = field.name;
    input.name = field.name;
    input.value = field.value;

    if (!field.editable) {
      input.setAttribute("readonly", "readonly");
      input.style.backgroundColor = "#f7f7f7"; 
    }

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(document.createElement("br"));
  });

  const passwordLabel = document.createElement("label");
  passwordLabel.textContent = "Password (leave blank if no change)";
  passwordLabel.setAttribute("for", "passwordInput");

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.id = "passwordInput";
  passwordInput.name = "passwordInput";

  form.appendChild(passwordLabel);
  form.appendChild(passwordInput);
  form.appendChild(document.createElement("br"));

  const confirmPasswordLabel = document.createElement("label");
  confirmPasswordLabel.textContent = "Confirm Password";
  confirmPasswordLabel.setAttribute("for", "confirmPasswordInput");

  const confirmPasswordInput = document.createElement("input");
  confirmPasswordInput.type = "password";
  confirmPasswordInput.id = "confirmPasswordInput";
  confirmPasswordInput.name = "confirmPasswordInput";

  form.appendChild(confirmPasswordLabel);
  form.appendChild(confirmPasswordInput);
  form.appendChild(document.createElement("br"));

  const submitButton = document.createElement("button");
  submitButton.textContent = "Update Info";
  form.appendChild(submitButton);

  form.addEventListener("submit", function (event) {
    event.preventDefault(); 
    const updatedUser = {
      firstNameInput: form.querySelector("input[name='firstNameInput']").value,
      lastNameInput: form.querySelector("input[name='lastNameInput']").value,
      emailInput: form.querySelector("input[name='emailInput']").value,
      userNameInput: form.querySelector("input[name='userNameInput']").value,
      ageInput: form.querySelector("input[name='ageInput']").value,
    };

    const password = form.querySelector("input[name='passwordInput']").value;
    const confirmPassword = form.querySelector("input[name='confirmPasswordInput']").value;

    if (password && password !== confirmPassword) {
      alert("Password and Confirm Password must match!");
      return; 
    }

    if (password) {
      updatedUser.passwordInput = password;
    } else {
      updatedUser.passwordInput = user.passwordInput;
    }

    localStorage.setItem("loggedUser", JSON.stringify(updatedUser));


    currentUserInfo.innerHTML = `Hello ${updatedUser.firstNameInput}! We are very happy to have you back!`;


    alert("Your information has been updated!");
  });


  formContainer.appendChild(form);
}

const navLinks = document.getElementById('nav-links');
const loggedLinks = document.getElementById('logged-links');

if (loggedUser) {
  navLinks.style.display = 'none'; 
  loggedLinks.style.display = 'block';

  const profileLink = document.createElement('a');
  profileLink.href = './Homepage.html';
  profileLink.textContent = 'Homepage';
  loggedLinks.appendChild(profileLink);

  const logoutLink = document.createElement('a');
  logoutLink.href = '#';
  logoutLink.textContent = 'Logout';
  logoutLink.onclick = function () {
    localStorage.removeItem('loggedUser'); 
    window.location.reload();
  };
  logoutLink.style.marginLeft = '15px';
  loggedLinks.appendChild(logoutLink);
}
