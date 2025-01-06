const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector('#addTaskBtn');
const taskList = document.querySelector('#taskList');
const showAllBtn = document.querySelector('#showAll');
const showCompletedBtn = document.querySelector("#showCompleted");
const showIncompleteBtn = document.querySelector('#showIncomplete');

let tasks = [];

function renderTasks (filter = "all") {
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') {
            return task.completed;
        }

        if (filter === 'Incomplete') {
            return !task.completed;  
        }

        return true;
    });

    filteredTasks.forEach((task,index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed":"";
    
        const taskText = document.createElement('span');
        taskText.textContent = task.name;

        const buttons = document.createElement('div');
        buttons.className = 'task_buttons';

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? 'Не выполнено':"Выполнено";
        completeBtn.className = 'complete';
        completeBtn.addEventListener("click", () => {
            toggleTaskCompletion(index);
        })

        const editBtn = document.createElement("button");
        editBtn.textContent = 'Редактировать';
        editBtn.className = 'edit';
        editBtn.addEventListener("click", () => {
            editTask(index);
        })

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = 'Удалить';
        deleteBtn.className = 'delete';
        deleteBtn.addEventListener("click", () => {
            deleteTask(index);
        })

        buttons.append(completeBtn, editBtn, deleteBtn);
        li.append(taskText, buttons);
        taskList.append(li);
    });
}

function eddTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({name: text, completed: false});
        taskInput.value = '';
        renderTasks(); 
    }   
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks(); 
}   
    
function editTask(index) {
    const newText = prompt("Редактировать задачу:", tasks[index].name);
    if (newText !== null) {
        tasks[index].name = newText.trim() || tasks[index].name;
        renderTasks();
    }   
}

function deleteTask(index) {
    tasks.splice(index,1);
    renderTasks();
}

addTaskBtn.addEventListener('click' , eddTask);

showAllBtn.addEventListener("click" , () => {
        renderTasks("all")
    });
showCompletedBtn.addEventListener("click" , () => {
        renderTasks("completed")
    });
showIncompleteBtn.addEventListener("click" , () => {
    renderTasks("Incomplete")
});

