console.log("Not logged in user script loaded! FARA ERORI!");
const navbar = document.querySelector(".navbar");

const newMenus = ["Register", "Log in"];

newMenus.forEach((name) => {
  const newDiv = document.createElement("div");
  newDiv.textContent = name;
  const camelCaseClass = name
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
  newDiv.classList.add(camelCaseClass);
  newDiv.id = camelCaseClass;
  navbar.appendChild(newDiv);
});

const loginBtn = document.getElementById("logIn");
loginBtn.addEventListener("click", () => {
  window.location.assign("../Login/login.html");
});

const registerBtn = document.getElementById("register");
registerBtn.addEventListener("click", () => {
  window.location.assign("../Register/register.html");
});

const bodyEl = document.getElementById("container");
