function login() {
    let mail = document.getElementById("email").value
    let pass = document.getElementById("senha").value

    let usuarioSalvo = localStorage.getItem("usuario")
    let senhaSalva = localStorage.getItem("senha")

    if (mail === "" || pass === "") {
        alert("Preencha todos os campos!")
        return
    }

    if (mail === usuarioSalvo && pass === senhaSalva) {
        localStorage.setItem("logado", "true")
        window.location.href = "index.html"
    } else {
        alert("Email ou senha incorretos!")
    }
}

function logout() {
    localStorage.removeItem("logado")
    window.location.href = "cadastro.html"
}