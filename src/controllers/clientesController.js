import clientes from "../models/Cliente.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as fs from "fs";
const authConfig = JSON.parse(fs.readFileSync('./src/config/auth.json'));

class ClienteController{

    static geraToken(params = {}){
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 30,
        });
    }

    //metodo para cadastrar um novo cliente
    static cadastrarCliente = async (req, res) => {
        const {nome, email, senha} = req.body;
        try{
            if(await clientes.findOne({email})){
                return res.status(400).send({message: 'Usuário já existe'});
            }else if(!nome || !email || !senha){
                return res.status(400).send({message: 'Preencha os campos para cadastrar'});
            }else{
                const cliente = await clientes.create(req.body);
                cliente.senha = undefined;
                return res.send({
                cliente,
                token: this.geraToken({id: cliente.id}),
                message: 'Cadastrado com sucesso'
                })
            }
        }catch(err){
            return res.status(400).send({message: "Falha ao cadastrar cliente!"});
        }
    }

    //metodo para listar todos os clientes
    static listarClientes = (req, res) => {
        clientes.find((err, clientes) => {
            res.status(200).json(clientes);
        })
    }

    static deletaCliente = (req, res) => {
        const id = req.params.id;
        clientes.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: 'Usuário deletado com sucesso'});
            }else{
                res.status(500).send({message: `${err.message} - Não foi possível excluir o usuário`});
            }
        })
    }

    static atualizarCliente = (req, res) => {
        const id = req.params.id
        clientes.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: 'Usuário atualizado com sucesso'});
            }else{
                res.status(500).send({message: `${err.message} - Falha ao atualizar usuário`});
            }
        })
    }

    //metodo para autenticar um login de cliente
    static autenticarCliente = async (req, res) => {
        const {email, senha} = req.body;
        const cliente = await clientes.findOne({email}).select('+senha');

        if(!cliente || !await bcrypt.compare(senha, cliente.senha)){
            return res.status(400).send({message: "email ou senha inválidos"})
        }

        cliente.senha = undefined;

        const token = res.send({
            message: "Logado com sucesso",
            token: this.geraToken({id: cliente.id}),
        });
        return token
    }

}

export default ClienteController;