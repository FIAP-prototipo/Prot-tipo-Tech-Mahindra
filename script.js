let video = document.getElementById("video");
let randomButton = document.getElementById("randomButton");
let points = 0; // Inicializa os pontos
const headerStorePoints = document.querySelector("#store-header-points");
let buttonTimeout; // Variável para armazenar o timeout

// Função para mostrar o botão aleatório
function showRandomButton() {
    let randomPoints = Math.floor(Math.random() * (200 - 50 + 1)) + 50; // Gera pontos aleatórios entre 50 e 200
    randomButton.textContent = `Ganhar ${randomPoints} Pontos`;
    randomButton.style.visibility = "visible"; // Mostra o botão
    positionButton(randomButton);
}

// Função para posicionar o botão aleatório dentro do player de vídeo
function positionButton(button) {
    let videoRect = video.getBoundingClientRect();
    let buttonWidth = button.offsetWidth;
    let buttonHeight = button.offsetHeight;

    let randomX = Math.random() * (videoRect.width - buttonWidth);
    let randomY = Math.random() * (videoRect.height - buttonHeight);

    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}

// Esconder o botão inicialmente
randomButton.style.visibility = "hidden"; // Esconde o botão inicialmente

// Exibir o botão após 3 segundos do vídeo começar
video.addEventListener("play", () => {
    clearTimeout(buttonTimeout);
    buttonTimeout = setTimeout(() => {
        showRandomButton(); // Chama a função para mostrar o botão após o atraso
    }, 3000); // Atraso de 3 segundos
});

// Adiciona evento de clique no botão de coletar pontos
randomButton.addEventListener("click", () => {
    let pointsToAdd = parseInt(randomButton.textContent.match(/\d+/)[0]); // Extrai os pontos do botão
    points += pointsToAdd;

    // Atualiza os pontos no cabeçalho da loja
    localStorage.setItem("points", points); // Armazena os pontos no localStorage
    randomButton.style.visibility = "hidden"; // Esconde o botão após o clique
});

// Esconde o botão se o vídeo for pausado ou terminar
video.addEventListener("pause", () => {
    randomButton.style.visibility = "hidden"; // Esconde o botão se o vídeo parar
});

video.addEventListener("ended", () => {
    randomButton.style.visibility = "hidden"; // Esconde o botão quando o vídeo termina
});

// Inicia um temporizador para mostrar o botão a cada 10 segundos
setInterval(() => {
    if (!video.paused && !video.ended) { // Verifica se o vídeo está em execução
        showRandomButton(); // Chama a função para mostrar o botão
    }
}, 10000); // A cada 10 segundos
