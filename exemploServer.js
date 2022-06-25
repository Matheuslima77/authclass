const mongoose = require('mongoose');
const express = require("express");
const api = express();
// cors serve para utilizar api com dominios diferentes
const cors = require('cors');
var jwt = require('jsonwebtoken');

async function start() {
    api.use(cors())
    api.use(express.json())
    api.use(express.urlencoded({ extended: true }))

    await mongoose.connect('mongodb+srv://mlgmatheuss:33166351@octoschool.qkewwxv.mongodb.net/Octoschool');

    const clienteSchema = new mongoose.Schema({
        name: String,
        email: String
    });

    const Cliente = mongoose.model('Cliente', clienteSchema);

    const UsuarioSchema = new mongoose.Schema({
        username: String,
        password: String
    });

    const Usuario = mongoose.model('Usuario', UsuarioSchema);
    const SECRET = '12345'
    api.post('/auth', async function(req, res){
        
        const user = req.body.username;
        const password = req.body.password;

        const usuario = await Usuario.findOne({ username: user, password: password}).exec();

        if(!usuario){
            res.send('Usuario ou senha incorretos!')
        }

        const token = jwt.sign({ id: usuario._id }, SECRET, {
            expiresIn: 3000
        });

        return res.json({ auth: true, token: token });

    })

    //Visualizar todos os clientes
    api.get('/auth', async function(req, res){
        
        const clientes = await Cliente.find({})


        res.json({
            data: clientes
        })

    })
    // Inserir um novo cliente
    api.post('/clientes', async function(req, res){

        const cliente = req.body

        const newData = await Cliente.create(cliente)

        res.json({ data: newData })

    })

    // Visualizar todos os dados de um cliente
    api.get('/clientes/:id', async function(req, res){
        const id = req.params.id
        const cliente = await Cliente.findById(id)

        res.json(cliente)
    })

    // Atualizar os dados de um cliente
    api.put('/clientes/:id', async function(req, res){
        const id = req.params.id
        const dadosDoCliente = req.body

        const cliente = await Cliente.findByIdAndUpdate(id, dadosDoCliente)
        
        res.send('Cliente Atualizado com Sucesso!')
    })

    // Deletar o registro de um cliente
    api.delete('/clientes/:id', async function(req, res){
        const id = req.params.id
        
        const cliente = await Cliente.deleteOne({ _id: id })

        res.send('Cliente Excluido com Sucesso!')
    })

    api.listen(3500,function(){
        console.log('Minha api está rodando na porta 3500!')
    })

}

start().catch(err => console.log(err));