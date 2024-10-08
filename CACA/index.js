const icons = [
    '../mikitoFort.jpg', 
    '../mikitoPOKER.jpg', 
    '../mikitoROLETA.jpg', 
    '../mikitoSLOT.jpg'
]; // Caminhos das imagens

const slotElements = [
    document.getElementById('slot1'),
    document.getElementById('slot2'),
    document.getElementById('slot3'),
    document.getElementById('slot4')
];

const spinBtn = document.getElementById('spinBtn');
const resetBtn = document.getElementById('resetBtn'); // Botão de reset
const betInput = document.getElementById('bet');
const resultDiv = document.getElementById('result');

let spinningIntervals = []; // Armazena os intervals de cada slot
let currentIconIndex = [0, 0, 0, 0]; // Armazena o índice atual do ícone para cada slot
let spinning = false; // Estado para saber se está girando

// Elementos de vídeo
const videoSpin = document.getElementById('video-spin');
const videoWin = document.getElementById('video-win');
const videoLose = document.getElementById('video-lose');

// O botão de reset deve ser visível ao carregar a página
resetBtn.style.display = 'block'; 

spinBtn.addEventListener('click', spinSlots);
resetBtn.addEventListener('click', resetGame); // Evento para o botão de reset

function spinSlots() {
    if (spinning) return; // Se já está girando, não faz nada
    spinning = true; // Define que o jogo está girando
    resetBtn.style.display = 'none'; // Esconder o botão de reset enquanto gira

    let betAmount = parseFloat(betInput.value);
    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Por favor, insira uma aposta válida!');
        spinning = false; // Reseta o estado ao sair
        return;
    }

    // Reiniciar resultado e interface
    resultDiv.textContent = '';

    // Esconder todos os vídeos inicialmente
    hideAllVideos();
    videoSpin.classList.remove('hidden');
    videoSpin.play(); // Toca o vídeo de girar

    // Definir uma posição inicial aleatória para cada slot
    for (let i = 0; i < currentIconIndex.length; i++) {
        currentIconIndex[i] = Math.floor(Math.random() * icons.length);
    }

    // Iniciar a rotação de cada slot
    for (let i = 0; i < slotElements.length; i++) {
        startSpinning(i);
    }

    // Parar cada slot em um momento diferente
    setTimeout(() => stopSpinning(0, betAmount), 4000); // Para o primeiro slot após 4s
    setTimeout(() => stopSpinning(1, betAmount), 6000); // Para o segundo slot após 6s
    setTimeout(() => stopSpinning(2, betAmount), 8000); // Para o terceiro slot após 8s
    setTimeout(() => stopSpinning(3, betAmount), 10000); // Para o quarto slot após 10s
}

// Função para iniciar a rotação de um slot específico com sequência
function startSpinning(slotIndex) {
    spinningIntervals[slotIndex] = setInterval(() => {
        // Avançar na sequência de ícones
        currentIconIndex[slotIndex] = (currentIconIndex[slotIndex] + 1) % icons.length;
        slotElements[slotIndex].src = icons[currentIconIndex[slotIndex]]; // Atualiza a imagem do slot
    }, 100); // Muda o ícone a cada 100ms
}

// Função para parar a rotação de um slot específico
function stopSpinning(slotIndex, betAmount) {
    clearInterval(spinningIntervals[slotIndex]);

    // Após todos os slots pararem, verificar o resultado
    if (slotIndex === slotElements.length - 1) {
        const results = slotElements.map(slot => slot.src); // Obtenha os caminhos das imagens
        checkResults(results, betAmount);
    }
}

function checkResults(results, betAmount) {
    const allEqual = results.every(icon => icon === results[0]);
    let payout = 0;

    // Para os resultados iguais
    if (allEqual) {
        switch (results[0]) {
            case '../mikitoFort.jpg':
                payout = betAmount * 5;
                break;
            case '../mikitoPOKER.jpg':
                payout = betAmount * 10;
                break;
            case '../mikitoROLETA.jpg':
                payout = betAmount * 20;
                break;
            case '../mikitoSLOT.jpg':
                payout = betAmount * 30;
                break;
        }
        resultDiv.textContent = `Você ganhou! Prêmio: R$ ${payout.toFixed(2)}`;
        videoWin.classList.remove('hidden');
        videoWin.play(); // Toca o vídeo de ganhar
    } else if (new Set(results).size === results.length) {
        payout = betAmount * 2;
        resultDiv.textContent = `Você ganhou! Prêmio: R$ ${payout.toFixed(2)}`;
        videoWin.classList.remove('hidden');
        videoWin.play(); // Toca o vídeo de ganhar
    } else {
        resultDiv.textContent = 'Você perdeu! Tente novamente!';
        videoLose.classList.remove('hidden');
        videoLose.play(); // Toca o vídeo de perder
    }

    // Mostrar o botão de reset ao final do jogo
    resetBtn.style.display = 'block';
    spinning = false; // Reseta o estado para permitir novas jogadas

    // Para o vídeo de girar
    videoSpin.pause(); // Pausa o vídeo de girar
    videoSpin.classList.add('hidden'); // Oculta o vídeo de girar
}

// Função para esconder todos os vídeos
function hideAllVideos() {
    videoSpin.classList.add('hidden');
    videoWin.classList.add('hidden');
    videoLose.classList.add('hidden');
}

// Função para voltar ao início
function resetGame() {
    window.location.href = '../index.html'; // Redireciona para a página inicial
}
