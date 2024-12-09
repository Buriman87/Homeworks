const selectedMonth = document.querySelector("#month");
const rootDiv = document.querySelector("#root");
const modal = document.querySelector("#modal");
selectedMonth.addEventListener("change", () => {
  const month = selectedMonth.value;
  if (month == "undefined") {
    rootDiv.innerHTML = "";
    return;
  }
  if (month == "Noiembrie") {
    generateMonth(30);
  } else {
    generateMonth(31);
  }
});

const createDiv = (day) => {
  const ziua = document.createElement("div");
  ziua.classList.add("dayDiv");
  ziua.classList.add(day);
  ziua.addEventListener("click", (e) => {
    const taskInput = prompt("Enter task:");
    if (taskInput.length <= 0) {
      alert("Task can not be empty");
      return;
    } else {
      e.target.innerHTML += `<p>${taskInput}</p>`;
      const task={
      }
    }

  });
  return ziua;
};
const createDay = (day) => {
  const ziua = document.createElement("p");
  ziua.innerText = day;
  return ziua;
};
const generateMonth = (days) => {
  rootDiv.innerHTML = "";
  for (let i = 0; i < days; i++) {
    let monthDays = createDiv(i + 1);
    let paraDay = createDay(i + 1);
    monthDays.appendChild(paraDay);
    rootDiv.appendChild(monthDays);
  }
};

const readFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
const writeToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const taskuri = readFromLS("taskuri") || [];
