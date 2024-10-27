function submitForm() {
    const form = document.getElementById('procrastinationForm');
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    let selectedValues = [];

    checkboxes.forEach((checkbox) => {
        selectedValues.push(checkbox.value);
    });

    let resultMessage = "";

    if (selectedValues.length > 0) {
        selectedValues.forEach((value) => {
            switch (value) {
                case "Vídeos e streaming (YouTube, Netflix, etc.)":
                    resultMessage += "<p>Você se identificou com vídeos e streaming. Tente limitar o tempo gasto nessas plataformas, usando um cronômetro ou apps de controle de tempo.</p>";
                    break;
                case "Jogos online":
                    resultMessage += "<p>Você se identificou com jogos online. Tente reservar um tempo específico para jogar após concluir suas tarefas mais importantes.</p>";
                    break;
                case "Navegação na internet sem propósito":
                    resultMessage += "<p>Você se identificou com navegação sem propósito. Defina limites para a navegação e tente manter um foco em sites que te ajudem a atingir seus objetivos.</p>";
                    break;
                case "Cansaço ou fadiga":
                    resultMessage += "<p>Você se identificou com cansaço. Tente dormir mais e adotar uma rotina de sono consistente para melhorar seu foco durante os estudos.</p>";
                    break;
                case "Ansiedade em relação às responsabilidades":
                    resultMessage += "<p>Você se identificou com ansiedade. Tente dividir suas tarefas em partes menores para tornar tudo mais manejável e reduzir a ansiedade.</p>";
                    break;
                case "Tarefas que parecem difíceis ou entediantes":
                    resultMessage += "<p>Você se identificou com tarefas difíceis ou entediantes. Tente usar a técnica Pomodoro ou recompensas pequenas para manter-se motivado ao longo do dia.</p>";
                    break;
                case "Ambientes com muitas distrações (TV, barulho, etc.)":
                    resultMessage += "<p>Você se identificou com ambientes com distrações. Tente encontrar um local tranquilo e organizado para estudar ou use fones de ouvido com música instrumental.</p>";
                    break;
                case "Excesso de tarefas":
                    resultMessage += "<p>Você se identificou com excesso de tarefas. Priorize suas atividades e tente delegar ou adiar tarefas menos importantes para não se sobrecarregar.</p>";
                    break;
                case "Perfeccionismo":
                    resultMessage += "<p>Você se identificou com perfeccionismo. Lembre-se que o progresso é mais importante que a perfeição. Tente concluir suas tarefas sem buscar o resultado ideal sempre.</p>";
                    break;
                case "Falta de motivação":
                    resultMessage += "<p>Você se identificou com falta de motivação. Tente definir metas claras e se recompensar por pequenas vitórias para aumentar sua motivação.</p>";
                    break;
                case "Conversas e bate-papos (WhatsApp, Messenger, etc.)":
                    resultMessage += "<p>Você se identificou com conversas e bate-papos. Tente desativar as notificações enquanto estuda e se concentrar em uma tarefa de cada vez.</p>";
                    break;
                default:
                    resultMessage += "<p>Opção não identificada.</p>";
                    break;
            }
        });

        document.getElementById('result').innerHTML = resultMessage;
    } else {
        document.getElementById('result').innerHTML = "<h3>Você não selecionou nenhuma opção.</h3>";
    }
}
