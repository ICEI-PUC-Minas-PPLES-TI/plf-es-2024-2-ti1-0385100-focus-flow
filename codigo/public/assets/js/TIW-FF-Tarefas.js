const apiUrl = "http://localhost:3000/tasks";

function loadTasks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(tasks => {
            clearTaskContainers();
            tasks.forEach(displayTask);
        })
        .catch(error => console.error("Erro ao carregar tarefas:", error));
}

function addTask() {
    const name = document.getElementById("taskName").value;
    const time = document.getElementById("taskTime").value;
    const description = document.getElementById("taskDescription").value;
    const priority = document.getElementById("priority").value;

    if (name && time && description) {
        const hour = parseInt(time.split(':')[0]);
        const period = getPeriod(hour);
        const task = { name, time, description, period, priority };

        fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task)
            })
            .then(() => loadTasks())
            .catch(error => console.error("Erro ao adicionar tarefa:", error));

        clearForm();
    } else {
        alert("Preencha todos os campos.");
    }
}

function deleteTask(id) {
    fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        })
        .then(() => loadTasks())
        .catch(error => console.error("Erro ao deletar tarefa:", error));
}

// Retorna o período do dia com base na hora
function getPeriod(hour) {
    if (hour >= 4 && hour < 12) return 'morningTasks';
    if (hour >= 12 && hour <= 17) return 'afternoonTasks';
    return 'nightTasks';
}

function displayTask(task) {
    const taskContainer = document.getElementById(task.period);
    const taskItem = document.createElement("div");
    taskItem.className = `task-item ${task.priority === "alta" ? "high-priority" : ""}`;
    taskItem.innerHTML = `
        <div>
            <strong>${task.name}</strong> - ${task.time}<br>${task.description}
        </div>
        <button onclick="deleteTask(${task.id})">❌</button>
    `;
    taskContainer.appendChild(taskItem);
}

// Limpa os contêineres de tarefas para evitar duplicação
function clearTaskContainers() {
    document.getElementById("morningTasks").innerHTML = '<h3>Manhã</h3>';
    document.getElementById("afternoonTasks").innerHTML = '<h3>Tarde</h3>';
    document.getElementById("nightTasks").innerHTML = '<h3>Noite</h3>';
}

function clearForm() {
    document.getElementById("taskName").value = '';
    document.getElementById("taskTime").value = '';
    document.getElementById("taskDescription").value = '';
    document.getElementById("priority").value = 'normal';
}

// Filtra as tarefas com base no texto de busca
function searchTask() {
    const query = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".task-item").forEach(task => {
        const isVisible = task.innerText.toLowerCase().includes(query);
        task.style.display = isVisible ? "block" : "none";
    });
}
loadTasks();