const dart = document.getElementById('dart');
const dartboard = document.getElementById('dartboard');
const result = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const launchButton = document.getElementById('launch-button');
const restartButton = document.getElementById('restart-button');
const levelSelector = document.getElementById('level-selector');
const countdownDisplay = document.createElement('div');

// Adicionando elemento de contagem regressiva ao DOM
countdownDisplay.id = 'countdown';
countdownDisplay.style.textAlign = 'center';
countdownDisplay.style.fontSize = '2rem';
countdownDisplay.style.margin = '20px';
dartboard.parentElement.insertBefore(countdownDisplay, dartboard);

let movingInterval;
let isGameRunning = false;
let score = 0;

// Configuração do tabuleiro
const dartboardRect = dartboard.getBoundingClientRect();
const centerX = dartboardRect.left + dartboardRect.width / 2; // Centro absoluto X
const centerY = dartboardRect.top + dartboardRect.height / 2; // Centro absoluto Y

// Função para calcular a distância do dardo ao centro
function calculateDistance(x, y) {
    return Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
}

// Função para determinar a pontuação
function calculateScore(distance) {
    const radius = dartboard.offsetWidth / 2;
    if (distance <= radius * 0.1) {
        return 100; // Área vermelha
    } else if (distance <= radius * 0.7) {
        return 50; // Área branca
    } else if (distance <= radius) {
        return 25; // Área verde
    }
    return 0; // Fora do alvo
}

// Função para movimentar o dardo
function startMovingDart(speed) {
    clearInterval(movingInterval);
    movingInterval = setInterval(() => {
        const randomX = Math.random() * dartboard.offsetWidth - dartboard.offsetWidth / 2;
        const randomY = Math.random() * dartboard.offsetHeight - dartboard.offsetHeight / 2;
        dart.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, speed);
}

// Contagem regressiva
function startCountdown(callback) {
    let countdown = 3;
    countdownDisplay.textContent = `Prepare-se: ${countdown}`;
    launchButton.disabled = true;
    restartButton.disabled = true;

    const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownDisplay.textContent = `Prepare-se: ${countdown}`;
        } else {
            clearInterval(interval);
            countdownDisplay.textContent = '';
            callback(); // Inicia o jogo após a contagem
            launchButton.disabled = false;
            restartButton.disabled = false;
        }
    }, 1000);
}

// Lógica do jogo
function startGame() {
    if (isGameRunning) return;

    result.textContent = 'Boa sorte!';
    isGameRunning = true;

    const level = levelSelector.value;
    const speed = { easy: 1000, medium: 500, hard: 300 }[level];

    startCountdown(() => startMovingDart(speed)); // Contagem antes de iniciar
}

function endGame(success, points = 0) {
    clearInterval(movingInterval);
    isGameRunning = false;
    launchButton.disabled = true;
    score += points;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    result.textContent = success
        ? `🎯 Você marcou ${points} pontos!`
        : '❌ Fora do alvo! Tente novamente.';
}

// Eventos
launchButton.addEventListener('click', () => {
    if (isGameRunning) {
        const dartRect = dart.getBoundingClientRect(); // Posição absoluta do dardo
        const dartX = dartRect.left + dartRect.width / 2; // Centro do dardo X
        const dartY = dartRect.top + dartRect.height / 2; // Centro do dardo Y
        const distance = calculateDistance(dartX, dartY); // Distância ao centro
        const points = calculateScore(distance); // Pontos com base na distância

        if (points > 0) {
            endGame(true, points);
        } else {
            endGame(false);
        }
    }
});

restartButton.addEventListener('click', () => {
    result.textContent = '';
    dart.style.transform = 'translate(0, 0)';
    score = 0;
    scoreDisplay.textContent = 'Pontuação: 0';
    startGame();
});

// Inicia o jogo
startGame();
