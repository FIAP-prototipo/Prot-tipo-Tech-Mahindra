document.addEventListener("DOMContentLoaded", () => {
    const headerStorePoints = document.getElementById("store-header-points");
    // Recupera os pontos armazenados no localStorage
    let points = parseInt(localStorage.getItem("points")) || 0;
    headerStorePoints.textContent = `Pontos: ${points}`; // Exibe os pontos na página da loja
});
