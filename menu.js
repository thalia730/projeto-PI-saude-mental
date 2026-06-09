// controle de telas (menu)

function abrir(tela) {
    document.getElementById("menu").style.display = "none"

    let telas = document.querySelectorAll(".tela")
    telas.forEach(t => t.style.display = "none")

    document.getElementById(tela).style.display = "block"
}

function voltar() {
    let telas = document.querySelectorAll(".tela")
    telas.forEach(t => t.style.display = "none")

    document.getElementById("menu").style.display = "block"
}
