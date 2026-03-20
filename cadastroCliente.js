const url = 'http://localhost:3000/usuarios'

async function cadastro() {
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

async function Login() {
    
}