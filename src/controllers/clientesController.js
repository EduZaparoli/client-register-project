import clientes from "../models/Cliente.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as fs from "fs";
const authConfig = JSON.parse(fs.readFileSync('./src/config/auth.json'));

class ClienteController{

    //metodo para cadastrar um novo cliente
    static cadastrarCliente = async (req, res) => {
        const {email} = req.body;
        try{
            if(await clientes.findOne({email})){
                return res.status(400).send({message: 'Usuário já existe'});
            }
            const cliente = await clientes.create(req.body);
            cliente.senha = undefined;
            return res.send({cliente})

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

        if(!cliente){
            return res.status(400).send({message: "Usuário não encontrado"})
        }
        if(!await bcrypt.compare(senha, cliente.senha)){
            return res.status(400).send({message: 'Senha inválida'});
        }

        cliente.senha = undefined;

        const token = jwt.sign({id: cliente.id}, authConfig.secret, {
            expiresIn: 86400,
        });

        res.send({cliente, token});
    }
    
}

export default ClienteController;