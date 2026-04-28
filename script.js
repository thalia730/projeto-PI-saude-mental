function publicar() {
    let texto = document.getElementById("texto").value;

    if (texto.trim() === "") {
        alert("Escreva algo primeiro!");
        return;
    }

    let novo = document.createElement("div");
    novo.className = "desabafo";
    novo.innerText = texto;

    document.getElementById("lista").prepend(novo);

    document.getElementById("texto").value = "";
}
