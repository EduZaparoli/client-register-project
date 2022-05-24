import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//schema do db
const clienteSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        email: {type: String, required: true},
        senha: {type: String, required: true, select: false}
    },
    {
        versionKey: false
    }
)

clienteSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

const clientes = mongoose.model("clientes", clienteSchema);

export default clientes;