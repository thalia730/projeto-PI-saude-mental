function cadastrar() {
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value

    if (email === "" || senha === "") {
        alert("Preencha todos os campos!")
        return
    }

    localStorage.setItem("usuario", email)
    localStorage.setItem("senha", senha)

    alert("Cadastro realizado com sucesso!")
    window.location.href = "login.html"
}