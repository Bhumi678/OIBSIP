console.log("Script Loaded Successfully!");

// ================== ELEMENTS ==================

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");

const currentDate = document.getElementById("currentDate");
const emptyMessage = document.getElementById("emptyMessage");
const quote = document.getElementById("quote");

// ================== DATE ==================

const today = new Date();
currentDate.textContent = today.toDateString();

// ================== QUOTES ==================

if (quote) {
    const quotes = [
        "Small progress every day adds up.",
        "Discipline beats motivation.",
        "Done is better than perfect.",
        "Success starts with consistency.",
        "One task at a time."
    ];

    quote.textContent =
        quotes[Math.floor(Math.random() * quotes.length)];
}

// ================== EVENTS ==================

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// ================== ADD TASK ==================

function addTask() {

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${taskInput.value}</span>
        <span class="delete">🗑️</span>
    `;
    li.dataset.category = category.value;
    taskList.appendChild(li);

    attachEvents(li);

    taskInput.value = "";

    saveData();
    updateStats();
    toggleEmptyMessage();
}

// ================== EVENTS FOR TASK ==================

function attachEvents(li) {

    const deleteBtn = li.querySelector(".delete");

    deleteBtn.addEventListener("click", function (e) {

        e.stopPropagation();

        li.remove();

        saveData();
        updateStats();
        toggleEmptyMessage();

    });

    li.addEventListener("click", function () {

        li.classList.toggle("completed");

        saveData();
        updateStats();

    });

}

// ================== STATS ==================

function updateStats() {

    const totalTasks = document.querySelectorAll("#taskList li").length;

    const completedTasks =
        document.querySelectorAll("#taskList li.completed").length;

    completedCount.textContent = completedTasks;

    pendingCount.textContent = totalTasks - completedTasks;

    let progress = 0;

    if (totalTasks > 0) {

        progress = Math.round((completedTasks / totalTasks) * 100);

    }

    progressFill.style.width = progress + "%";

    progressPercent.textContent = progress + "% Completed";

}

// ================== EMPTY MESSAGE ==================

function toggleEmptyMessage() {

    if (taskList.children.length === 0) {

        emptyMessage.style.display = "block";

    }

    else {

        emptyMessage.style.display = "none";

    }

}

// ================== LOCAL STORAGE ==================

function saveData() {

    localStorage.setItem("tasks", taskList.innerHTML);

}

function showTask() {

    taskList.innerHTML = localStorage.getItem("tasks") || "";

    const allTasks = taskList.querySelectorAll("li");

    allTasks.forEach(function (li) {

        attachEvents(li);

    });

    updateStats();
    toggleEmptyMessage();

}

showTask();
const filters = document.querySelectorAll(".filter");

filters.forEach(function(filter){

    filter.addEventListener("click", function(){

        const selectedCategory = filter.dataset.category;

        const tasks = document.querySelectorAll("#taskList li");

        tasks.forEach(function(task){

            if(
                selectedCategory === "All" ||
                task.dataset.category === selectedCategory
            ){
                task.style.display = "flex";
            }
            else{
                task.style.display = "none";
            }

        });

    });

});