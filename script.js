"use strict"

// General List
var taskList = [];

if ((localStorage.getItem("taskList")) !== null) {
    taskList = JSON.parse(localStorage.getItem("taskList"));
}

let editId;
let isEditTask = false;

const input = document.querySelector('#inputs .add-input');

// Display Tasks
let doList = document.getElementById("task-to-do");
let doneList = document.getElementById("task-done");

function displayTasks() {
    doList.innerHTML = "";
    doneList.innerHTML = "";

    for (let task of taskList) {
        if (task.status == "pending") {
            let doTask = `
                
                <div class="card mb-2">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-md-10">
                                <p>${task.task_name}<p>
                            </div>
                            <div class="checkbox col-12 col-md-2 align-items-center justify-content-end d-flex">
                                <button onclick="changeStatus(${task.id}, '${task.status}')" id="checkBtn" type="submit"><i class="fa-solid fa-check"></i></button>
                                <button onclick="editTask(${task.id}, '${task.task_name}')" type="submit"><i class="fa-regular fa-pen-to-square"></i></button>
                                <button onclick="deleteTask(${task.id})" type="submit"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    
            doList.insertAdjacentHTML("beforeend", doTask);
        }
        
        else {
            let doneTask = `
                <div class="card mb-2">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-md-10">
                                <p class="text-decoration-line-through">${task.task_name}<p>
                            </div>
                            <div class="checkbox col-12 col-md-2 align-items-center justify-content-end d-flex">
                                <button onclick="changeStatus(${task.id}, '${task.status}')" id="checkBtn" type="submit"><i class="fa-solid fa-xmark"></i></button>
                                <button onclick="editTask(${task.id}, '${task.task_name}')" type="submit"><i class="fa-regular fa-pen-to-square"></i></button>
                                <button onclick="deleteTask(${task.id})" type="submit"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    
            doneList.insertAdjacentHTML("beforeend", doneTask);
        }
    }
    elementCounter();
}

displayTasks()


// Add Task
document.querySelector('#inputs .add-button').addEventListener("click", addTask);
document.querySelector('#inputs .add-input').addEventListener("keypress", function(event){
    if (event.key == "Enter") {
        document.querySelector("#inputs .add-button").click();
        event.preventDefault();
    }
});

function addTask() {

    if (input.value == ""){
        alert("Enter a task name!")
    }
    
    else {
        if (!isEditTask) {
            taskList.push({"id": taskList.length + 1, "task_name": input.value, "status": "pending"})
        } else {
            for (let task of taskList){
                if (task.id == editId){
                    task.task_name = input.value;
                }
                isEditTask = false;
            }
        }
        
        input.value = "";
        displayTasks();
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }
}

// Edit Task
function editTask(taskId, task_name) {
    editId = taskId;
    isEditTask = true;
    input.value = task_name;
    input.focus();
}

// Delete Task
function deleteTask(id) {
    let deletedId;

    // for (let index in taskList) {
    //     if (taskList[index].id == id) {
    //         deletedId = index;
    //     }
    // }

    // deletedId = taskList.findIndex(function(task) {
    //     return task.id == id;
    // })

    deletedId = taskList.findIndex(task => task.id == id);

    taskList.splice(deletedId, 1);
    displayTasks();
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

// Delete All Task
function deleteAllTasks() {
    if (taskList.length == 0){
        alert("Task list is empty");
    } else {
        taskList.splice(0, taskList.length);
        localStorage.setItem("taskList", JSON.stringify(taskList));
        displayTasks();
    }
}

function changeStatus(taskId, taskStatus) {
    for (let task of taskList) {
        if (task.id == taskId) {
            if (taskStatus == "pending") {
                task.status = "done";
                            
            } else {
                task.status = "pending";
            }
        }
    }
    displayTasks()
    localStorage.setItem("taskList", JSON.stringify(taskList));
}



// Element Counter
function elementCounter() {
    let pending = 0;
    let done = 0;

    for (let counter of taskList) {
        if (counter.status == "pending") {
            pending++;
        }
        else {
            done++;
        }
    }

    let todo_title = document.querySelector("#todo");
    let done_title = document.querySelector("#done");

    todo_title.innerText = "To Do List - " + pending;
    done_title.innerText = "Done - " + done;
}