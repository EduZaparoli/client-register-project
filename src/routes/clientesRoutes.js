import express from "express";
import ClienteController from "../controllers/clientesController.js";

//constante para definir a rota do express
const router = express.Router();

//oque vai acontecer na rota
router
    .get("/clientes", ClienteController.listarClientes)
    .post("/clientes", ClienteController.cadastrarCliente)
    .post("/clientes/autenticar", ClienteController.autenticarCliente)
    .put("/clientes/id:", ClienteController.atualizarCliente)
    .delete("/clientes/:id", ClienteController.deletaCliente)

export default router;