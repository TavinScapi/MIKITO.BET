document.getElementById("spinBtn").addEventListener("click", function() {
    const betInput = document.getElementById("bet");
    const bet = parseInt(betInput.value);
    const rouletteNumber = Math.floor(Math.random() * 37); // Gera um número entre 0 e 36
    const resultDiv = document.getElementById("result");
    const rouletteDisplay = document.getElementById("roulette-number");

    // Adiciona uma classe para animar a roleta
    rouletteDisplay.classList.add("rotate");

    // Remove a classe após a animação para que ela possa ser reaplicada
    setTimeout(() => {
        rouletteDisplay.classList.remove("rotate");
        rouletteDisplay.textContent = rouletteNumber; // Atualiza o número da roleta
    }, 1000); // 1 segundo para a animação

    if (bet < 0 || bet > 36) {
        resultDiv.textContent = "Aposte um número válido entre 0 e 36.";
        return;
    }

    if (bet === rouletteNumber) {
        resultDiv.textContent = `Parabéns! Você ganhou! O número sorteado foi ${rouletteNumber}.`;
    } else {
        resultDiv.textContent = `Você perdeu. O número sorteado foi ${rouletteNumber}.`;
    }

    betInput.value = ''; // Limpa o input após a aposta
});
