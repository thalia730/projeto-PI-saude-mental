// MENU
function abrir(tela) {
    document.getElementById("menu").style.display = "none";
    document.querySelectorAll(".tela").forEach(t => t.style.display = "none");

    document.getElementById(tela).style.display = "block";

    // 👉 ativa respiração só quando entrar nessa tela
    if (tela === "telaRespiracao") {
        iniciarRespiracao();
    }
}

function voltar() {
    document.querySelectorAll(".tela").forEach(t => t.style.display = "none");
    document.getElementById("menu").style.display = "block";
}

// AUDIO
let tocando = false;

function toggleAudio() {
    let audio = document.getElementById("bgAudio");
    let botao = document.getElementById("botaoAudio");

    if (!tocando) {
        audio.play();
        botao.textContent = "🔇";
        tocando = true;
    } else {
        audio.pause();
        botao.textContent = "🔊";
        tocando = false;
    }
}

// POPUP
function mostrarPopup(msg) {
    let popup = document.getElementById("popup");
    popup.textContent = msg;
    popup.classList.add("show");

    setTimeout(() => popup.classList.remove("show"), 3000);
}

// EMOTES
let mensagemEmote = "";

function selecionarEmote(emote) {
    if (emote === "😊") mensagemEmote = "Você está bem 💚";
    if (emote === "😔") mensagemEmote = "Vai passar 💚";
    if (emote === "😰") mensagemEmote = "Respire fundo";
    if (emote === "😡") mensagemEmote = "Calma...";
    if (emote === "😴") mensagemEmote = "Descanse";

    mostrarPopup(mensagemEmote);
}

// FRASES
const frases = [
    "Você é mais forte 💚",
    "Vai dar certo ✨",
    "Respire fundo 🌿"
];

// DESABAFO
function publicar() {
    let texto = document.getElementById("texto").value;

    if (texto.trim() === "") {
        mostrarPopup("Escreva algo!");
        return;
    }

    let lista = document.getElementById("lista");

    let div = document.createElement("div");
    div.classList.add("desabafo");

    let p = document.createElement("p");
    p.textContent = texto;

    let acoes = document.createElement("div");

    // EDITAR
    let editar = document.createElement("button");
    editar.textContent = "Editar";

    editar.onclick = () => {
        let textarea = document.createElement("textarea");
        textarea.value = p.textContent;

        let salvar = document.createElement("button");
        salvar.textContent = "Salvar";

        salvar.onclick = () => {
            if (textarea.value.trim() !== "") {
                p.textContent = textarea.value;
                div.replaceChild(p, textarea);
                acoes.replaceChild(editar, salvar);
            }
        };

        div.replaceChild(textarea, p);
        acoes.replaceChild(salvar, editar);
    };

    // EXCLUIR
    let excluir = document.createElement("button");
    excluir.textContent = "Excluir";
    excluir.onclick = () => div.remove();

    acoes.appendChild(editar);
    acoes.appendChild(excluir);

    div.appendChild(p);
    div.appendChild(acoes);

    lista.appendChild(div);

    document.getElementById("texto").value = "";
}

// LOGOUT
function logout() {
    localStorage.removeItem("logado");
    window.location.href = "login.html";
}

function iniciarRespiracao() {
    let texto = document.getElementById("textoRespiracao");

    function ciclo() {
        texto.textContent = "Inspire...";

        setTimeout(() => {
            texto.textContent = "Segure...";
        }, 2000);

        setTimeout(() => {
            texto.textContent = "Expire...";
        }, 4000);
    }

    ciclo(); // começa

    setInterval(ciclo, 6000); // repete o ciclo
}

// METAS
let metas = JSON.parse(localStorage.getItem("metas")) || [];

function salvarMetas() {
    localStorage.setItem("metas", JSON.stringify(metas));
}

function adicionarMeta() {
    let texto = document.getElementById("novaMeta").value;
    let data = document.getElementById("dataMeta").value;

    if (!texto) {
        alert("Digite uma meta!");
        return;
    }

    // 👉 se não escolher data, usa hoje
    if (!data) {
        data = new Date().toISOString().split("T")[0];
    }

    metas.push({ texto, data, concluida: false });

    salvarMetas();
    renderizarMetas();

    // limpa campo
    document.getElementById("novaMeta").value = "";
     document.getElementById("dataMeta").value = "";

}

function renderizarMetas() {
    let lista = document.getElementById("listaMetas");
    lista.innerHTML = "";

    let hoje = new Date().toISOString().split("T")[0];
    let metasHoje = metas;

    let concluidas = 0;

    metasHoje.forEach((meta, i) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = `${meta.texto} (${meta.data})`;

        if (meta.concluida) {
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.6";
        }

        // ✔ CONCLUIR
        let btnConcluir = document.createElement("button");
        btnConcluir.textContent = "✔";
        btnConcluir.onclick = () => {
            meta.concluida = !meta.concluida;
            salvarMetas();
            renderizarMetas();
        };

        // ✏️ EDITAR
        let btnEditar = document.createElement("button");
        btnEditar.textContent = "✏️";

        btnEditar.onclick = () => {
            let novoTexto = prompt("Editar meta:", meta.texto);

            if (novoTexto && novoTexto.trim() !== "") {
                meta.texto = novoTexto;
                salvarMetas();
                renderizarMetas();
            }
        };

        // 🗑 EXCLUIR
        let btnExcluir = document.createElement("button");
        btnExcluir.textContent = "🗑";

        btnExcluir.onclick = () => {
            metas.splice(i, 1);
            salvarMetas();
            renderizarMetas();
        };

        // AGRUPA BOTÕES
        let acoes = document.createElement("div");
        acoes.appendChild(btnConcluir);
        acoes.appendChild(btnEditar);
        acoes.appendChild(btnExcluir);

        li.appendChild(span);
        li.appendChild(acoes);

        lista.appendChild(li);
    });
    document.getElementById("contador").textContent =
        `Concluídas: ${concluidas} / ${metasHoje.length}`;
}

// 🔥 IMPORTANTE (corrige tudo)
window.onload = () => {
    // frase do dia
    document.getElementById("frases").textContent =
        frases[Math.floor(Math.random() * frases.length)];

    // iniciar respiração
    iniciarRespiracao();
};
renderizarMetas();