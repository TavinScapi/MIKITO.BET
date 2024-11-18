// Variáveis para o jogo
let playerScore = 0;
let opponentScore = 0;
let roundNumber = 1;
let playerHand = [];
let opponentHand = [];
let playerRoundScore = 0;
let opponentRoundScore = 0;
let trucoCalled = false;
let roundWinner = "";
let roundEnded = false;

// Função para gerar as cartas
function generateCards() {
    const deck = ["4", "5", "6", "7", "Q", "J", "K", "A"];
    playerHand = [];
    opponentHand = [];

    // Distribuindo 3 cartas para cada jogador
    for (let i = 0; i < 3; i++) {
        playerHand.push(deck[Math.floor(Math.random() * deck.length)]);
        opponentHand.push(deck[Math.floor(Math.random() * deck.length)]);
    }

    updateHandDisplay();
    updateRoundInfo();
}

// Função para atualizar as mãos no jogo
function updateHandDisplay() {
    const playerContainer = document.getElementById("player-hand");
    const opponentContainer = document.getElementById("opponent-hand");
    playerContainer.innerHTML = '';
    opponentContainer.innerHTML = '';

    playerHand.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.innerText = card;
        playerContainer.appendChild(cardElement);
    });

    opponentHand.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.innerText = card;
        opponentContainer.appendChild(cardElement);
    });
}

// Função para atualizar a rodada e o placar
function updateRoundInfo() {
    document.getElementById("round").textContent = `Rodada ${roundNumber}`;
    document.getElementById("score-player").textContent = `Jogador: ${playerScore}`;
    document.getElementById("score-opponent").textContent = `Adversário: ${opponentScore}`;
    document.getElementById("current-truco").textContent = `Truco: ${trucoCalled ? "Sim" : "Não"}`;
}

// Função para jogar uma carta
function playCard() {
    if (roundEnded) {
        alert("A rodada já terminou. Inicie uma nova rodada!");
        return;
    }

    if (playerHand.length === 0) {
        alert("Você não tem mais cartas!");
        return;
    }

    // O jogador escolhe uma carta (simplificado para a primeira carta)
    const playerCard = playerHand.shift();
    const opponentCard = opponentHand.shift();

    // Lógica simples para comparar as cartas
    const result = compareCards(playerCard, opponentCard);

    if (result === "player") {
        playerRoundScore++;
        roundWinner = "Você ganhou esta rodada!";
    } else if (result === "opponent") {
        opponentRoundScore++;
        roundWinner = "O adversário ganhou esta rodada!";
    } else {
        roundWinner = "Empate!";
    }

    // Exibindo o resultado da rodada
    document.getElementById("round-result").textContent = roundWinner;

    // Verificar se a rodada terminou
    if (playerRoundScore === 2) {
        playerScore++;
        roundEnded = true;
        roundWinner = "Você venceu a rodada!";
    } else if (opponentRoundScore === 2) {
        opponentScore++;
        roundEnded = true;
        roundWinner = "O adversário venceu a rodada!";
    }

    updateRoundInfo();
    updateHandDisplay();
}

// Função para comparar as cartas (simplificada)
function compareCards(playerCard, opponentCard) {
    const values = { "4": 4, "5": 5, "6": 6, "7": 7, "Q": 8, "J": 9, "K": 10, "A": 11 };

    if (values[playerCard] > values[opponentCard]) {
        return "player";
    } else if (values[playerCard] < values[opponentCard]) {
        return "opponent";
    } else {
        return "tie";
    }
}

// Função para chamar Truco
function callTruco() {
    if (roundEnded) {
        alert("A rodada já terminou. Inicie uma nova rodada!");
        return;
    }

    trucoCalled = !trucoCalled;
    updateRoundInfo();
    alert("Truco chamado! A aposta foi aumentada.");
}

// Inicia o jogo
generateCards();
