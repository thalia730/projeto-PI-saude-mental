// 🔊 ÁUDIO
let tocando = false

function toggleAudio() {
    let audio = document.getElementById("bgAudio")
    let botao = document.getElementById("botaoAudio")

    if (!tocando) {
        audio.play();
        audio.volume = 0.2;
        botao.textContent = "🔇";
        tocando = true
    } else {
        audio.pause()
        botao.textContent = "🔊";
        tocando = false
    }
}

// 💚 POPUP
function mostrarPopup(msg, tipo = "sucesso") {
    let popup = document.getElementById("popup")

    popup.textContent = msg
    popup.classList.remove("erro")

    if (tipo === "erro") popup.classList.add("erro")

    popup.classList.add("show")

    setTimeout(() => {
        popup.classList.remove("show")
    }, 3000)
}


// 😊 EMOTES
let emoteSelecionado = ""
let mensagemEmote = ""

function selecionarEmote(emote) {
    emoteSelecionado = emote

    if (emote === "😊") mensagemEmote = "Que bom que você está bem 💚"
    if (emote === "😔") mensagemEmote = "Você não está sozinho(a) 💚"
    if (emote === "😰") mensagemEmote = "Respire fundo 🧘"
    if (emote === "😡") mensagemEmote = "Tente relaxar 💭"
    if (emote === "😴") mensagemEmote = "Descanse 😴"

    mostrarPopup(mensagemEmote);
}
const frases = [
    "Você é mais forte do que pensa 💚",
    "Vai dar tudo certo ✨",
    "Respire fundo, isso vai passar 🌿",
    "Você não está sozinho(a) 💚",
    "Continue, você consegue 💪"
];
function mostrarFrase() {
    const aleatoria = frases[Math.floor(Math.random() * frases.length)]
    document.getElementById("frases").textContent = aleatoria
}
window.onload = mostrarFrase
// 💬 PUBLICAR
function publicar() {
    let texto = document.getElementById("texto").value

    if (texto.trim() === "") {
        mostrarPopup("Escreva algo!", "erro")
        return
    }

    let lista = document.getElementById("lista")

    let div = document.createElement("div")
    div.classList.add("desabafo");

    let p = document.createElement("p")
    p.textContent = texto;

    let msg = document.createElement("p")
    msg.textContent = mensagemEmote;

    let acoes = document.createElement("div")
    acoes.classList.add("acoes")

    // 🖊️EDITAR
    let editar = document.createElement("button")
    editar.textContent = "Editar"
    editar.onclick = () => {

        // cria textarea com texto atual
        let textarea = document.createElement("textarea")
        textarea.value = p.textContent
        textarea.style.width = "100%"

        // botão salvar
        let salvar = document.createElement("button")
        salvar.textContent = "Salvar"

        salvar.onclick = () => {
            if (textarea.value.trim() !== "") {
                p.textContent = textarea.value

                // volta ao normal
                div.replaceChild(p, textarea)
                acoes.replaceChild(editar, salvar)
            }
        };

        // troca texto por textarea
        div.replaceChild(textarea, p)

        // troca botão editar por salvar
        acoes.replaceChild(salvar, editar)
    };
    //  EXCLUIR
    let btn = document.createElement("button")
    btn.textContent = "Excluir"

    btn.onclick = () => lista.removeChild(div)

    // AGRUPANDO
    acoes.appendChild(editar)
    acoes.appendChild(btn)

    // ADICIONANDO
    div.appendChild(p)
    div.appendChild(msg)
    div.appendChild(acoes)

    // ✅ ESSA LINHA FALTAVA
    lista.appendChild(div)

    // feedback
    mostrarPopup("Desabafo publicado 💚")

    // limpar campo
    document.getElementById("texto").value = ""
}
function logout() {
    localStorage.removeItem("logado");
    window.location.href = "login.html";
}

let metas = JSON.parse(localStorage.getItem("metas")) || [];

function salvarMetas() {
    localStorage.setItem("metas", JSON.stringify(metas));
}

function adicionarMeta() {
    let texto = document.getElementById("novaMeta").value;
    let data = document.getElementById("dataMeta").value;

    if (texto === "" || data === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Emojis automáticos simples
    let emoji = "🎯";
    if (texto.toLowerCase().includes("água")) emoji = "💧";
    if (texto.toLowerCase().includes("correr") || texto.toLowerCase().includes("exerc")) emoji = "🏃";
    if (texto.toLowerCase().includes("estudar")) emoji = "📚";
    if (texto.toLowerCase().includes("dormir")) emoji = "😴";

    metas.push({
        texto: `${emoji} ${texto}`,
        data: data,
        concluida: false
    });

    salvarMetas();
    renderizarMetas();

    document.getElementById("novaMeta").value = "";
}

function renderizarMetas() {
    let lista = document.getElementById("listaMetas");
    lista.innerHTML = "";

    let hoje = new Date().toISOString().split("T")[0];

    let metasHoje = metas.filter(m => m.data === hoje);

    let concluidas = 0;

    metasHoje.forEach((meta, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.innerText = meta.texto;

        if (meta.concluida) {
            span.classList.add("concluida");
            concluidas++;
        }

        let btnConcluir = document.createElement("button");
        btnConcluir.innerText = "✔";
        btnConcluir.onclick = function () {
            meta.concluida = !meta.concluida;
            salvarMetas();
            renderizarMetas();
        };

        let btnRemover = document.createElement("button");
        btnRemover.innerText = "🗑";
        btnRemover.onclick = function () {
            metas.splice(index, 1);
            salvarMetas();
            renderizarMetas();
        };

        li.appendChild(span);
        li.appendChild(btnConcluir);
        li.appendChild(btnRemover);

        lista.appendChild(li);
    });

    // Atualiza contador
    document.getElementById("contador").innerText =
        `Concluídas: ${concluidas} / ${metasHoje.length}`;
}

// Carregar ao abrir
renderizarMetas();