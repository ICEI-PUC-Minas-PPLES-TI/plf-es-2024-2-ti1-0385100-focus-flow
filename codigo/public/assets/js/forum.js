const apiUrl = 'http://localhost:3000/activities';


async function loadActivities() {
    try {
        const response = await fetch(apiUrl);
        const activities = await response.json();
        const activityList = document.getElementById("activityList");
        activityList.innerHTML = ''; 
        activities.forEach(activity => {
            const listItem = document.createElement("li");
            listItem.textContent = activity.title;
            activityList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Erro ao carregar as atividades:", error);
    }
}


async function addActivity() {
    const input = document.getElementById("activityInput");
    const activity = input.value.trim();

    if (activity) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: activity })
            });

            if (response.ok) {
                loadActivities();
                input.value = ""; 
            } else {
                alert("Erro ao adicionar atividade");
            }
        } catch (error) {
            console.error("Erro ao adicionar a atividade:", error);
        }
    } else {
        alert("Por favor, insira uma atividade.");
    }
}


window.onload = loadActivities;
