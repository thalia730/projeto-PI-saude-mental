function abrir(tela) {
    document.getElementById("menu").style.display = "none"
    document.querySelectorAll(".tela").forEach(t => t.style.display = "none")

    const elemento = document.getElementById(tela)
    elemento.style.display = "flex"

    if (tela === "telaRespiracao") {
        iniciarRespiracao()
    }
}

function voltar() {
    document.querySelectorAll(".tela").forEach(t => t.style.display = "none")
    document.getElementById("menu").style.display = "block"
}

let tocando = false

function toggleAudio() {
    const audio = document.getElementById("bgAudio")
    const botao = document.getElementById("botaoAudio")

    if (!tocando) {
        audio.play()
        botao.textContent = "🔇"
        tocando = true
    } else {
        audio.pause()
        botao.textContent = "🔊"
        tocando = false
    }
}

function mostrarPopup(msg) {
    const popup = document.getElementById("popup")
    popup.textContent = msg
    popup.classList.add("show")

    setTimeout(() => popup.classList.remove("show"), 3000)
}

function selecionarEmote(emote) {
    if (emote === "😊") {
        mostrarPopup("Você está bem 💚")
    }

    if (emote === "😔") {
        perguntarAcao("Quer desabafar agora?", () => abrir("telaDesabafo"))
    }

    if (emote === "😰") {
        perguntarAcao("Quer fazer respiração guiada agora?", () => abrir("telaRespiracao"))
    }

    if (emote === "😡") {
        perguntarAcao("Quer ir para respiração para acalmar?", () => abrir("telaRespiracao"))
    }

    if (emote === "😴") {
        mostrarPopup("Talvez seja hora de descansar 😴")
    }
}

function perguntarAcao(mensagem, acaoSim) {
    const popup = document.getElementById("popup")

    popup.innerHTML = `
        <div style="text-align:center">
            <p>${mensagem}</p>
            <button onclick="responderSim()">Sim</button>
            <button onclick="fecharPopup()">Não</button>
        </div>
    `

    popup.classList.add("show")
    window.acaoConfirmada = acaoSim
}

function responderSim() {
    fecharPopup()

    if (window.acaoConfirmada) {
        window.acaoConfirmada()
    }
}

function fecharPopup() {
    document.getElementById("popup").classList.remove("show")
}

const frases = [
    "Você é mais forte do que imagina 💚",
    "Um passo de cada vez 🌿",
    "Respirar também é recomeçar 🌬️",
    "Você não precisa dar conta de tudo hoje ✨",
    "Vai ficar tudo bem 💚",
    "Seu ritmo é suficiente 🌿",
    "Seja gentil com você hoje 💚",
    "Até dias difíceis passam 🌤️",
    "Você já superou coisas difíceis ✨",
    "Respire fundo... você está seguro(a) 🌬️",
    "Tudo bem não estar bem 💚",
    "Você merece paz mental 🌿",
    "Devagar também é progresso 🌱",
    "Está tudo bem pausar 🌿",
    "Você não está sozinho(a) 💚"
]

function publicar() {
    const texto = document.getElementById("texto").value

    if (texto.trim() === "") {
        mostrarPopup("Escreva algo!")
        return
    }

    const lista = document.getElementById("lista")

    const div = document.createElement("div")
    div.classList.add("desabafo")

    const p = document.createElement("p")
    p.textContent = texto

    const acoes = document.createElement("div")

    const editar = document.createElement("button")
    editar.textContent = "Editar"

    editar.onclick = () => {
        const textarea = document.createElement("textarea")
        textarea.value = p.textContent

        const salvar = document.createElement("button")
        salvar.textContent = "Salvar"

        salvar.onclick = () => {
            if (textarea.value.trim() !== "") {
                p.textContent = textarea.value
                div.replaceChild(p, textarea)
                acoes.replaceChild(editar, salvar)
            }
        }

        div.replaceChild(textarea, p)
        acoes.replaceChild(salvar, editar)
    }

    const excluir = document.createElement("button")
    excluir.textContent = "Excluir"

    excluir.onclick = () => div.remove()

    acoes.appendChild(editar)
    acoes.appendChild(excluir)

    div.appendChild(p)
    div.appendChild(acoes)

    lista.appendChild(div)

    document.getElementById("texto").value = ""
}

function logout() {
    localStorage.removeItem("logado")
    window.location.href = "login.html"
}

function iniciarRespiracao() {
    const texto = document.getElementById("textoRespiracao")
    const bolinha = document.querySelector(".bolinha")

    if (window.intervalRespiracao) {
        clearInterval(window.intervalRespiracao)
    }

    let fase = 0

    bolinha.style.transform = "scale(1)"
    texto.innerText = "Prepare..."

    setTimeout(() => {
        function ciclo() {
            if (fase === 0) {
                texto.innerText = "Inspire..."
                bolinha.style.transform = "scale(1.5)"
            }

            if (fase === 1) {
                texto.innerText = "Segure..."
                bolinha.style.transform = "scale(1.5)"
            }

            if (fase === 2) {
                texto.innerText = "Expire..."
                bolinha.style.transform = "scale(1)"
            }

            fase = (fase + 1) % 3
        }

        ciclo()
        window.intervalRespiracao = setInterval(ciclo, 3000)
    }, 2000)
}

let metas = JSON.parse(localStorage.getItem("metas")) || []

function salvarMetas() {
    localStorage.setItem("metas", JSON.stringify(metas))
}

function adicionarMeta() {
    let texto = document.getElementById("novaMeta").value
    let data = document.getElementById("dataMeta").value

    if (!texto) {
        alert("Digite uma meta!")
        return
    }

    if (!data) {
        data = new Date().toISOString().split("T")[0]
    }

    metas.push({ texto, data, concluida: false })

    salvarMetas()
    renderizarMetas()

    document.getElementById("novaMeta").value = ""
    document.getElementById("dataMeta").value = ""
}

function renderizarMetas() {
    const lista = document.getElementById("listaMetas")
    lista.innerHTML = ""

    let concluidas = 0

    metas.forEach((meta, i) => {
        const li = document.createElement("li")

        const span = document.createElement("span")
        span.textContent = `${meta.texto} (${meta.data})`

        if (meta.concluida) {
            span.style.textDecoration = "line-through"
            span.style.opacity = "0.6"
            concluidas++
        }

        const btnConcluir = document.createElement("button")
        btnConcluir.textContent = "✔"

        btnConcluir.onclick = () => {
            meta.concluida = !meta.concluida
            salvarMetas()
            renderizarMetas()
        }

        const btnEditar = document.createElement("button")
        btnEditar.textContent = "✏️"

        btnEditar.onclick = () => {
            const novoTexto = prompt("Editar meta:", meta.texto)

            if (novoTexto && novoTexto.trim() !== "") {
                meta.texto = novoTexto
                salvarMetas()
                renderizarMetas()
            }
        }

        const btnExcluir = document.createElement("button")
        btnExcluir.textContent = "🗑"

        btnExcluir.onclick = () => {
            metas.splice(i, 1)
            salvarMetas()
            renderizarMetas()
        }

        const acoes = document.createElement("div")
        acoes.appendChild(btnConcluir)
        acoes.appendChild(btnEditar)
        acoes.appendChild(btnExcluir)

        li.appendChild(span)
        li.appendChild(acoes)

        lista.appendChild(li)
    })

    document.getElementById("contador").textContent =
        `Concluídas: ${concluidas} / ${metas.length}`
}

window.onload = () => {
    document.getElementById("frases").textContent =
        frases[Math.floor(Math.random() * frases.length)]

    renderizarMetas()
}