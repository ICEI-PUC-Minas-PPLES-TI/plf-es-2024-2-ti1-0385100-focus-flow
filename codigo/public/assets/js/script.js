document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById('search');
    const videoContainers = Array.from(document.querySelectorAll('.video')); // Seleciona todas as divs de vídeo

    async function loadVideos() {
        try {
            const response = await fetch('library.json');
            const videos = await response.json();

            // Função para exibir os vídeos com base no filtro de pesquisa
            function displayVideos(filteredVideos) {
                // Limpa todas as divs de vídeo
                videoContainers.forEach(container => (container.innerHTML = ''));

                // Insere os vídeos filtrados nas divs disponíveis
                filteredVideos.forEach((video, index) => {
                    if (videoContainers[index]) {
                        const videoLink = document.createElement('a');
                        videoLink.href = video.url;
                        videoLink.target = '_blank';
                        videoLink.textContent = video.titulo;
                        videoContainers[index].appendChild(videoLink);
                    }
                });
            }

            // Exibe todos os vídeos inicialmente
            displayVideos(videos);

            // Adiciona um evento para filtrar vídeos conforme o usuário digita
            input.addEventListener('input', () => {
                const searchTerm = input.value.toLowerCase();
                const filteredVideos = videos.filter(video => video.titulo.toLowerCase().includes(searchTerm));
                displayVideos(filteredVideos);
            });

        } catch (error) {
            console.error('Erro ao carregar vídeos', error);
        }
    }

    loadVideos();
});
