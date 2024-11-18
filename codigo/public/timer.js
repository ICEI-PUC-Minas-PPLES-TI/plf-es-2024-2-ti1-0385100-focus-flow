// Selecionando elementos
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const stopButton = document.getElementById('stop-btn');
const focusLengthInput = document.getElementById('focus-length');
const breakLengthInput = document.getElementById('break-length');
const focus = document.getElementById('focus-reason')

// Variáveis de controle do temporizador
let focusTime = parseInt(focusLengthInput.value) * 60; // em segundos
let breakTime = parseInt(breakLengthInput.value) * 60; // em segundos
let timer;
let isTimerRunning = false;
let isBreak = false;

// Função para formatar o tempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
function changeColorFocus() {
    document.body.style.backgroundColor = "#FFD700";
}

// Função para alterar a cor de fundo para descanso
function changeColorPause() {
    document.body.style.backgroundColor = "#A8E6CF";
}




// Atualizar o display do timer
function updateDisplay(time) {
    timerDisplay.textContent = formatTime(time);
}

// Função para iniciar o temporizador
function startTimer() {
    if (isTimerRunning) return;

    saveFocusData(getFocusReason(), focusTime)

    isTimerRunning = true;
    timer = setInterval(() => {
        if (isBreak) {
            breakTime--;
            updateDisplay(breakTime);
            if (breakTime <= 0) {
                clearInterval(timer);
                isTimerRunning = false;
                alert("Hora de voltar ao trabalho!");
                isBreak = false; // Reseta para o ciclo de foco
                breakTime = parseInt(breakLengthInput.value) * 60;
                updateDisplay(focusTime); // Reinicia o foco
            }
        } else {
            focusTime--;
            updateDisplay(focusTime);
            if (focusTime <= 0) {
                clearInterval(timer);
                isTimerRunning = false;
                alert("Hora do descanso!");
                isBreak = true; // Muda para o descanso
                focusTime = parseInt(focusLengthInput.value) * 60; // Reinicia o tempo de foco
                updateDisplay(breakTime); // Mostra o tempo de descanso
            }
        }
    }, 1000);
}

// Função para pausar o temporizador
function pauseTimer() {
    clearInterval(timer);
    isTimerRunning = false;
}

// Função para parar o temporizador
function stopTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    if (isBreak) {
        breakTime = parseInt(breakLengthInput.value) * 60;
        updateDisplay(breakTime);
    } else {
        focusTime = parseInt(focusLengthInput.value) * 60;
        updateDisplay(focusTime);
    }
}

// Funções para ajustar os tempos de foco e descanso
function increaseFocusTime() {
    focusTime += 60;
    focusLengthInput.value = focusTime / 60;
    if (!isTimerRunning && !isBreak) {
        updateDisplay(focusTime);
    }
}

function decreaseFocusTime() {
    if (focusTime > 60) {
        focusTime -= 60;
        focusLengthInput.value = focusTime / 60;
        if (!isTimerRunning && !isBreak) {
            updateDisplay(focusTime);
        }
    }
}

function increaseBreakTime() {
    breakTime += 60;
    breakLengthInput.value = breakTime / 60;
    if (!isTimerRunning && isBreak) {
        updateDisplay(breakTime);
    }
}

function decreaseBreakTime() {
    if (breakTime > 60) {
        breakTime -= 60;
        breakLengthInput.value = breakTime / 60;
        if (!isTimerRunning && isBreak) {
            updateDisplay(breakTime);
        }
    }
}



function getFocusReason() {
    let focusReason = focus.value;
    return focusReason
}

function getRestTime() {
    const breakLengthInSeconds = parseInt(breakLengthInput.value) * 60; // Obtém em segundos
    const restTimeInMinutes = Math.floor(breakLengthInSeconds / 60);   // Converte para minutos
    return restTimeInMinutes;
}


// Eventos dos botões
startButton.addEventListener('click', startTimer);
startButton.addEventListener('click', changeColorFocus);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);
stopButton.addEventListener('click', changeColorPause);

// Ajuste de tempo de foco e descanso
document.getElementById('focus-increase').addEventListener('click', increaseFocusTime);
document.getElementById('focus-decrease').addEventListener('click', decreaseFocusTime);
document.getElementById('break-increase').addEventListener('click', increaseBreakTime);
document.getElementById('break-decrease').addEventListener('click', decreaseBreakTime);

// Inicialização do timer com o valor padrão de foco
updateDisplay(focusTime);

function saveFocusData(focusReason, focusTime) {
    const restTime = getRestTime(); // Obtendo o tempo de descanso formatado
    fetch('/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            focusReason: focusReason,
            focusTime: focusTime,
            restTime: restTime, // Adicionando o restTime em minutos
            timestamp: new Date().toISOString()
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Dado salvo com sucesso:', data);
        })
        .catch((error) => {
            console.log('Erro ao salvar os dados:' + error);
        });
}


function loadFocusHistory() {
    fetch('/sessions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                console.warn('Nenhum dado encontrado ou formato inválido.');
                return;
            }

            const historySection = document.querySelector('.history');
            const historyChart = historySection.querySelector('.history-chart');
            const historyList = historySection.querySelector('ul');

            // Limpa elementos existentes antes de adicionar novos
            historyChart.innerHTML = '';
            historyList.innerHTML = '';

            // Calcula o maior tempo para escalar as barras
            const maxTime = Math.max(...data.map(session => session.focusTime));
            const maxHeight = 200; // Altura máxima das barras (em pixels)

            // Adiciona as barras e os itens à lista
            data.forEach((session, index) => {
                // Valida focusTime como numérico
                if (typeof session.focusTime !== 'number' || session.focusTime <= 0) {
                    console.warn(`Tempo inválido na sessão ${index + 1}:`, session);
                    return;
                }

                // Criar barra do gráfico
                const bar = document.createElement('div');
                bar.className = 'bar';

                const height = (session.focusTime / maxTime) * maxHeight; // Altura proporcional
                bar.style.height = `${height}px`;
                bar.title = `${session.focusReason}: ${formatTime(session.focusTime)}`; // Tooltip para informações adicionais
                historyChart.appendChild(bar);

                // Criar item da lista
                const listItem = document.createElement('li');
                listItem.textContent = `${session.focusReason} - ${formatTime(session.focusTime)} - ${formatTime(session.restTime * 60)}`;


                historyList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error('Erro ao carregar o histórico:', error);
        });
}

document.addEventListener('DOMContentLoaded', loadFocusHistory);
