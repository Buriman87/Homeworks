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
    const bodyCheckModal = document.querySelector("body");
    const bodyChild = [...bodyCheckModal.children];
    if (bodyChild.some((el) => el.className === "modalDiv")) {
      bodyCheckModal.removeChild(
        bodyChild.find((el) => el.className === "modalDiv")
      );
    }
    generateMonth(30);
  } else {
    const bodyCheckModal = document.querySelector("body");
    const bodyChild = [...bodyCheckModal.children];
    if (bodyChild.some((el) => el.className === "modalDiv")) {
      bodyCheckModal.removeChild(
        bodyChild.find((el) => el.className === "modalDiv")
      );
    }
    generateMonth(31);
  }
});

const createDiv = (day) => {
  const ziua = document.createElement("div");
  ziua.classList.add("dayDiv");
  ziua.classList.add(day);
  ziua.addEventListener("click", () => {
    generateTaskWindow(day, selectedMonth.value);
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

function generateTaskWindow(day, month) {
  console.log(day, month);
  const bodyCheckModal = document.querySelector("body");
  const bodyChild = [...bodyCheckModal.children];
  if (bodyChild.some((el) => el.className === "modalDiv")) {
    bodyCheckModal.removeChild(
      bodyChild.find((el) => el.className === "modalDiv")
    );
    return;
  }
  const modalDiv = document.createElement("div");
  const headDiv = document.createElement("div");
  const listDiv = document.createElement("div");
  const lowDiv = document.createElement("div");
  const dayMonthDiv = document.createElement("div");
  const closeBtnDiv = document.createElement("div");
  modalDiv.className = "modalDiv";
  headDiv.className = "headDiv";
  listDiv.className = "listDiv";
  lowDiv.className = "lowDiv";
  dayMonthDiv.className = "dayMonthDiv";
  closeBtnDiv.className = "closeBtnDiv";
  closeBtnDiv.innerHTML = "<span>X</span>";
  headDiv.appendChild(dayMonthDiv);
  headDiv.appendChild(closeBtnDiv);
  modalDiv.appendChild(headDiv);
  modalDiv.appendChild(listDiv);
  modalDiv.appendChild(lowDiv);
  dayMonthDiv.innerText = `${day} ${month}`;
  document.body.appendChild(modalDiv);
  closeBtnDiv.addEventListener("click", () => {
    bodyCheckModal.removeChild(modalDiv);
  });

  const inputTask = document.createElement("input");
  const addTask = document.createElement("button");
  addTask.innerText = "Add task";
  lowDiv.append(inputTask, addTask);
  console.log(day,month)
  addTask.addEventListener("click", () => {
    if (inputTask.value.length > 0) {
      let tasks = readFromLS("taskuri") || [];
      
     
      const task = {
        ziua: day,
        luna: month,
        task: inputTask.value,
      };
      console.log(task)
      tasks.push(task);
      writeToLS("taskuri", tasks);
    }
  });
}
