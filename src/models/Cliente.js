import mongoose from "mongoose";

//schema do db
const clienteSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        email: {type: String, required: true},
        senha: {type: String, required: true}
    },
    {
        versionKey: false
    }
)

const clientes = mongoose.model("clientes", clienteSchema);

export default clientes;