const express = require('express');
const mysql = require('mysql2');
const app = express();


app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mercearia_db'
});

app.post('/usuarios', (req, res)=>{
    const {nome, email , senha}= req.body;
    const sql= "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

    db.query(sql, [nome,email,senha], (err, results)=>{
        if(err) return res.status(500).send(err);
        res.send('Usuário cadastrado com sucesso!');
    })
})

app.get('/usuarios', (req, res)=>{
    db.query('SELECT * FROM usuarios', (err, results)=>{
        if(err) return res.status(500).send(err);
        res.json(results);
    })
})

app.listen(3000, ()=>{
    console.log('🚀 Servidor rodando em http://localhost:3000')
})