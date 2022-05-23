import clientes from "../models/Cliente.js";

class ClienteController{

    //metodo para cadastrar um novo cliente
    static cadastrarCliente = (req, res) => {
        let cliente = new clientes(req.body);
        cliente.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar cliente!`});
            }else{
                res.status(201).send(cliente.toJSON());
            }
        })
    }

    //metodo para listar todos os clientes
    static listarClientes = (req, res) => {
        clientes.find((err, clientes) => {
            res.status(200).json(clientes);
        })
    }

    //metodo para autenticar um login de cliente
    static autenticarCliente = (req, res) => {
        console.log(req.body)
        clientes.findOne(req.body).then(response => {
            console.log(response)
            if(response != null){
                res.status(200).send({message: 'Logado com sucesso'});
            }else{
                res.status(200).send({message: 'E-mail ou senha inválidos'});
            }
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
}

export default ClienteController;