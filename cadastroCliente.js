const url = 'http://localhost:3000/usuarios'

async function cadastro() {
    //event.preventDefault();
    const nome = document.getElementById('nomeCliente').value;
    const email = document.getElementById('emailCliente').value;
    const senha1 = document.getElementById('senhaCliente1').value;
    const senha2 = document.getElementById('senhaCliente2').value;
    const spanDiferente = document.getElementById('spanDiferentes');
    const spanVazio = document.getElementById('spanVazio');
    const spanMenor = document.getElementById('spanMenor');

    spanMenor.style.display= 'none'
    spanDiferente.style.display= 'none';
    spanVazio.style.display='none';


    if(senha1.length <8 || senha2.length <8){
        spanMenor.style.display= 'block';
        return
    }
    if(senha1 === '' || senha2 === ''){
        spanVazio.style.display='block';
        document.getElementById('senhaCliente1').focus();
        return
    }
    if(senha1 != senha2){ 
        spanDiferente.style.display = 'block';
        document.getElementById('senhaCliente1').value = '';
        document.getElementById('senhaCliente2').value = '';
        return;
    }
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            nome,
            email,
            senha: senha1
        })
    });
    alert ("Cliente cadastrado com sucesso");
}

async function Login(event) {
    // 1. Captura o formulário do seu HTML
const formLogin = document.getElementById('formularioLogin');

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede a página de recarregar

    // 2. Pega os dados que o usuário digitou nos inputs HTML
    const email = document.getElementById('emailCliente').value;
    const senha = document.getElementById('senhaCliente').value;

    // Validação simples de front-end
    if (!email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    try {
        // 3. O FETCH dispara os dados para o seu NODE.JS
        const response = await fetch('http://localhost:3000/login', { // <-- SUA API AQUI!
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Avisa o Node que estamos mandando um JSON
            },
            body: JSON.stringify({ email, senha }) // Transforma o objeto em texto JSON
        });

        const data = await response.json(); // Converte o que o Node respondeu em objeto JS

        if (response.ok) {
            // Se o Node respondeu com sucesso (Status 200)
            localStorage.setItem('token', data.token); // Salva o token de login
            alert("Login realizado com sucesso!");
            window.location.href = 'dashboard.html'; // Redireciona no HTML puro
        } else {
            // Se o Node deu erro (ex: usuário não encontrado ou senha errada)
            alert(data.mensagem || "Erro ao fazer login.");
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Não foi possível conectar ao servidor. O seu Node.js está rodando?");
    }
});
}