import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

//conexão com o db caso aconteça erro
db.on("error", console.log.bind(console, "Erro de conexão"));

//conexão com o db caso de certo
db.once("open", () => {
    console.log("Conexão bem sucedida");
})

//constante que recebe uma instancia do express
const app = express();

//vai interpretar oque chega via POST e PUT
app.use(express.json());

//direcionar as rotas
routes(app);

//exportar o arquivo para usar no server
export default app;