document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");

    // Generate calendar for December and January
    function generateCalendar() {
        const months = [
            { name: "December", days: 31 },
            { name: "January", days: 31 }
        ];
        let html = "";

        months.forEach((month, index) => {
            html += `<div style="grid-column: span 7; font-weight: bold; text-align: center;">${month.name}</div>`;
            for (let day = 1; day <= month.days; day++) {
                const dateKey = `${month.name}-${day}`;
                const tasks = getTasks(dateKey);

                html += `
                    <div class="day" data-date="${dateKey}">
                        <div>${day}</div>
                        <div class="task-list">
                            ${tasks.map(task => `<div>${task}</div>`).join("")}
                        </div>
                        <div class="task-input">
                            <input type="text" placeholder="Add task" />
                            <button>Save</button>
                        </div>
                    </div>
                `;
            }
        });

        calendar.innerHTML = html;
    }

    // Get tasks from localStorage
    function getTasks(dateKey) {
        const tasks = localStorage.getItem(dateKey);
        return tasks ? JSON.parse(tasks) : [];
    }

    // Save a task to localStorage
    function saveTask(dateKey, task) {
        const tasks = getTasks(dateKey);
        tasks.push(task);
        localStorage.setItem(dateKey, JSON.stringify(tasks));
    }

    // Event delegation for task adding
    calendar.addEventListener("click", (event) => {
        const dayElement = event.target.closest(".day");
        if (!dayElement) return;

        const dateKey = dayElement.getAttribute("data-date");
        const taskInput = dayElement.querySelector(".task-input");
        const inputField = taskInput.querySelector("input");
        const saveButton = taskInput.querySelector("button");

        // Toggle task input visibility
        if (!taskInput.style.display || taskInput.style.display === "none") {
            taskInput.style.display = "block";
        } else {
            taskInput.style.display = "none";
        }

        // Handle task saving
        saveButton.addEventListener("click", () => {
            const task = inputField.value.trim();
            if (task) {
                saveTask(dateKey, task);
                inputField.value = "";
                taskInput.style.display = "none";
                generateCalendar(); // Refresh calendar to display the new task
            }
        });

        // Prevent propagation of click event to avoid reopening input
        event.stopPropagation();
    });

    // Generate the calendar initially
    generateCalendar();
});
