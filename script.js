// 🔊 ÁUDIO
let tocando = false;

function toggleAudio() {
    let audio = document.getElementById("bgAudio");
    let botao = document.getElementById("botaoAudio");

    if (!tocando) {
        audio.play();
        audio.volume = 0.2;
        botao.textContent = "🔇";
        tocando = true;
    } else {
        audio.pause();
        botao.textContent = "🔊";
        tocando = false;
    }
}

// 💚 POPUP
function mostrarPopup(msg, tipo = "sucesso") {
    let popup = document.getElementById("popup");

    popup.textContent = msg;
    popup.classList.remove("erro");

    if (tipo === "erro") popup.classList.add("erro");

    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 3000);
}

// 😊 EMOTES
let emoteSelecionado = "";
let mensagemEmote = "";

function selecionarEmote(emote) {
    emoteSelecionado = emote;

    if (emote === "😊") mensagemEmote = "Que bom que você está bem 💚";
    if (emote === "😔") mensagemEmote = "Você não está sozinho(a) 💚";
    if (emote === "😰") mensagemEmote = "Respire fundo 🧘";
    if (emote === "😡") mensagemEmote = "Tente relaxar 💭";
    if (emote === "😴") mensagemEmote = "Descanse 😴";

    mostrarPopup(mensagemEmote);
}

// 💬 PUBLICAR
function publicar() {
    let texto = document.getElementById("texto").value;

    if (texto.trim() === "") {
        mostrarPopup("Escreva algo!", "erro");
        return;
    }

    if (emoteSelecionado === "") {
        mostrarPopup("Escolha um emoji!", "erro");
        return;
    }

    let lista = document.getElementById("lista");

    let div = document.createElement("div");
    div.classList.add("desabafo");

    let p = document.createElement("p");
    p.textContent = emoteSelecionado + " " + texto;

    let msg = document.createElement("p");
    msg.textContent = mensagemEmote;

    let btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => lista.removeChild(div);

    div.appendChild(p);
    div.appendChild(msg);
    div.appendChild(btn);

    lista.appendChild(div);

    mostrarPopup("Desabafo publicado 💚");

    document.getElementById("texto").value = "";
}

// 💚 FRASES
const frases = [
    "Você está fazendo o melhor que pode 💚",
    "Respire fundo 🌿",
    "Um passo de cada vez 🧘",
    "Vai passar 🌅"
];

function gerarFrase() {
    let frase = frases[Math.floor(Math.random() * frases.length)];
    document.getElementById("fraseMotivacional").textContent = frase;
}

window.onload = gerarFrase;