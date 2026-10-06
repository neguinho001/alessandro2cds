const area = document.getElementById("area-jogo");
const bola = document.getElementById("bola");
const iniciar = document.getElementById("iniciar");
const pontosTexto = document.getElementById("pontos");
const tempoTexto = document.getElementById("tempo");
const recordeTexto = document.getElementById("recorde");
const mensagem = document.getElementById("mensagem");

let pontos = 0;
let tempo = 30;
let jogoAtivo = false;
let intervalo;

let recorde = Number(localStorage.getItem("recordeAlessandro")) || 0;
recordeTexto.textContent = recorde;

function moverBola() {
    const limiteX = area.clientWidth - bola.offsetWidth;
    const limiteY = area.clientHeight - bola.offsetHeight;

    const x = Math.floor(Math.random() * Math.max(1, limiteX));
    const y = Math.floor(Math.random() * Math.max(1, limiteY));

    bola.style.left = x + "px";
    bola.style.top = y + "px";
}

function iniciarJogo() {
    pontos = 0;
    tempo = 30;
    jogoAtivo = true;

    pontosTexto.textContent = pontos;
    tempoTexto.textContent = tempo;
    mensagem.textContent = "Vai! Clique na bola! ⚽";
    iniciar.disabled = true;
    iniciar.textContent = "🔥 Jogo acontecendo...";

    bola.style.display = "flex";
    moverBola();

    clearInterval(intervalo);

    intervalo = setInterval(() => {
        tempo--;
        tempoTexto.textContent = tempo;

        if (tempo <= 0) {
            finalizarJogo();
        }
    }, 1000);
}

function clicarNaBola() {
    if (!jogoAtivo) return;

    pontos++;
    pontosTexto.textContent = pontos;
    moverBola();

    if (pontos % 5 === 0) {
        mensagem.textContent = "🔥 " + pontos + " pontos! Continue!";
    }
}

function finalizarJogo() {
    jogoAtivo = false;
    clearInterval(intervalo);

    bola.style.display = "none";
    iniciar.disabled = false;
    iniciar.textContent = "🔄 Jogar novamente";

    if (pontos > recorde) {
        recorde = pontos;
        localStorage.setItem("recordeAlessandro", recorde);
        recordeTexto.textContent = recorde;
        mensagem.textContent = "🏆 NOVO RECORDE! Você fez " + pontos + " pontos!";
    } else {
        mensagem.textContent = "⏱️ Fim de jogo! Você fez " + pontos + " pontos.";
    }
}

iniciar.addEventListener("click", iniciarJogo);
bola.addEventListener("click", clicarNaBola);
bola.addEventListener("touchstart", function(event) {
    event.preventDefault();
    clicarNaBola();
}, { passive: false });
