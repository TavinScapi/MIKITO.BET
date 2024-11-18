const cartas = [
    "A♥", "2♥", "3♥", "4♥", "5♥", "6♥", "7♥", "8♥", "9♥", "10♥", "J♥", "Q♥", "K♥",
    "A♦", "2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "J♦", "Q♦", "K♦",
    "A♣", "2♣", "3♣", "4♣", "5♣", "6♣", "7♣", "8♣", "9♣", "10♣", "J♣", "Q♣", "K♣",
    "A♠", "2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "J♠", "Q♠", "K♠"
];

let fichasJogador = 100;
let fichasMaquina = 100;
let aposta = 10;
let rodada = 1;

document.getElementById('apostar').addEventListener('click', function() {
    const valorApostaInput = document.getElementById('valorAposta');
    const valorAposta = parseInt(valorApostaInput.value);
    
    if (valorAposta > 0 && valorAposta <= fichasJogador) {
        aposta = valorAposta;
        fichasJogador -= aposta;
        document.getElementById('fichasJogador').textContent = fichasJogador;
        document.getElementById('darCarta').disabled = false;
        document.getElementById('desistir').disabled = false;
        document.getElementById('cartasComum').innerHTML = ''; // Limpar cartas em comum
    } else {
        alert("Aposta inválida!");
    }
});

document.getElementById('darCarta').addEventListener('click', function() {
    // Distribuindo cartas em comum
    let cartasComum = [];
    for (let i = 0; i < 3; i++) { // Três cartas em comum
        cartasComum.push(cartas[Math.floor(Math.random() * cartas.length)]);
    }
    document.getElementById('cartasComum').innerHTML = cartasComum.join(' ');

    // Distribuindo cartas para o jogador
    const cartaJogador1 = cartas[Math.floor(Math.random() * cartas.length)];
    const cartaJogador2 = cartas[Math.floor(Math.random() * cartas.length)];
    document.getElementById('cartaJogador1').textContent = cartaJogador1;
    document.getElementById('cartaJogador2').textContent = cartaJogador2;

    // Distribuindo cartas para a máquina
    const cartaMaquina1 = cartas[Math.floor(Math.random() * cartas.length)];
    const cartaMaquina2 = cartas[Math.floor(Math.random() * cartas.length)];
    document.getElementById('cartaMaquina1').textContent = cartaMaquina1;
    document.getElementById('cartaMaquina2').textContent = cartaMaquina2;

    // Determinando o vencedor
    const resultado = determinarVencedor(cartaJogador1, cartaJogador2, cartaMaquina1, cartaMaquina2, cartasComum);
    document.getElementById('resultado').textContent = resultado;

    // Atualizando fichas
    if (resultado.includes("Você ganhou")) {
        fichasJogador += aposta * 2; // O jogador ganha o dobro da aposta
    } else if (resultado.includes("A máquina ganhou")) {
        fichasMaquina += aposta; // A máquina ganha a aposta
    }

    document.getElementById('fichasJogador').textContent = fichasJogador;
    document.getElementById('fichasMaquina').textContent = fichasMaquina;

    // Verificando se alguém ficou sem fichas
    if (fichasJogador <= 0) {
        document.getElementById('vencedorFinal').textContent = "A máquina ganhou o jogo!";
    } else if (fichasMaquina <= 0) {
        document.getElementById('vencedorFinal').textContent = "Você ganhou o jogo!";
    }

    // Desabilitar botão "Dar Carta"
    document.getElementById('darCarta').disabled = true;
});

document.getElementById('desistir').addEventListener('click', function() {
    alert("Você desistiu da rodada!");
    document.getElementById('darCarta').disabled = true;
});

function determinarVencedor(cartaJogador1, cartaJogador2, cartaMaquina1, cartaMaquina2, cartasComum) {
    const valorCartas = {
        "A": 14, "K": 13, "Q": 12, "J": 11,
        "10": 10, "9": 9, "8": 8, "7": 7,
        "6": 6, "5": 5, "4": 4, "3": 3, "2": 2
    };

    const valor1 = valorCartas[cartaJogador1.slice(0, -1)];
    const valor2 = valorCartas[cartaJogador2.slice(0, -1)];
    const valorMaquina1 = valorCartas[cartaMaquina1.slice(0, -1)];
    const valorMaquina2 = valorCartas[cartaMaquina2.slice(0, -1)];

    const maxJogador = Math.max(valor1, valor2, ...cartasComum.map(carta => valorCartas[carta.slice(0, -1)]));
    const maxMaquina = Math.max(valorMaquina1, valorMaquina2, ...cartasComum.map(carta => valorCartas[carta.slice(0, -1)]));

    if (maxJogador > maxMaquina) {
        return "Você ganhou!";
    } else if (maxJogador < maxMaquina) {
        return "A máquina ganhou!";
    } else {
        return "Empate!";
    }
}
