function abrir(tela) {
    document.getElementById("menu").style.display = "none"

    document.querySelectorAll(".tela").forEach(t => {
        t.style.display = "none"
    })

    let elemento = document.getElementById(tela)
    elemento.style.display = "flex"
}

function voltar() {
    document.querySelectorAll(".tela").forEach(t => {
        t.style.display = "none"
    })

    document.getElementById("menu").style.display = "block"
}