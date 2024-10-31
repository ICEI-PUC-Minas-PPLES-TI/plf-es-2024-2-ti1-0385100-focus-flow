function submitForm() {
    const form = document.getElementById('procrastinationForm');
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    let selectedValues = [];

    // Coleta os valores dos checkboxes selecionados
    checkboxes.forEach((checkbox) => {
        selectedValues.push(checkbox.value);
    });

    // Faz a requisição para obter os dados do JSON Server
    fetch('http://localhost:3000/form')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter as informações do servidor.');
            }
            return response.json();
        })
        .then(data => {
            // Agora estamos acessando data.checkboxes
            const checkboxesData = data.checkboxes;

            // Inicializa a mensagem de resultado
            let resultMessage = "";

            // Verifica se algum checkbox foi selecionado
            if (selectedValues.length > 0) {
                // Cria mensagens para os checkboxes selecionados
                selectedValues.forEach((value) => {
                    const checkboxInfo = checkboxesData.find(cb => cb.value === value);
                    if (checkboxInfo) {
                        resultMessage += `<p>${checkboxInfo.message}</p>`;
                    }
                });
            } else {
                resultMessage = "<h3>Você não selecionou nenhuma opção.</h3>";
            }

            // Exibe a mensagem final
            document.getElementById('result').innerHTML = resultMessage;
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('result').innerHTML = "<h3>Erro ao obter as informações do servidor.</h3>";
        });
}

