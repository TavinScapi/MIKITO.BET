// blackjack.js
let playerCards = [];
let dealerCards = [];

function getRandomCard() {
    return Math.floor(Math.random() * 11) + 1;
}

function updateScores() {
    const playerScore = playerCards.reduce((a, b) => a + b, 0);
    const dealerScore = dealerCards.reduce((a, b) => a + b, 0);
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('dealer-score').textContent = dealerScore;
    return { playerScore, dealerScore };
}

function checkGameStatus() {
    const { playerScore, dealerScore } = updateScores();
    if (playerScore > 21) {
        document.getElementById('result').textContent = 'Você perdeu!';
        disableButtons();
    } else if (dealerScore > 21) {
        document.getElementById('result').textContent = 'Você ganhou!';
        disableButtons();
    } else if (playerScore === 21) {
        document.getElementById('result').textContent = 'Blackjack! Você ganhou!';
        disableButtons();
    }
}

function disableButtons() {
    document.getElementById('hit-btn').disabled = true;
    document.getElementById('stand-btn').disabled = true;
}

document.getElementById('hit-btn').addEventListener('click', function() {
    playerCards.push(getRandomCard());
    document.getElementById('player-cards').innerHTML += `<div class="card">${playerCards[playerCards.length - 1]}</div>`;
    checkGameStatus();
});

document.getElementById('stand-btn').addEventListener('click', function() {
    while (dealerCards.reduce((a, b) => a + b, 0) < 17) {
        dealerCards.push(getRandomCard());
        document.getElementById('dealer-cards').innerHTML += `<div class="card">${dealerCards[dealerCards.length - 1]}</div>`;
    }
    checkGameStatus();
});
