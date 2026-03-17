const url = 'http://localhost:3000/usuarios'

async function cadastro() {
    const nome = document.getElementById('nomeCliente').value;
    const email = document.getElementById('emailCliente').value;
    const senha = document.getElementById('senhaCliente').value;

    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            nome,
            email,
            senha
        })
    });
    alert ("Cliente cadastrado com sucesso");
}