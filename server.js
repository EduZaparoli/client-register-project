import app from "./src/app.js";

//acessar a porta do ambiente de produção ou a porta fixa 3000
const port = process.env.PORT || 3000;

//lincar a porta que vai escutar a req e mandar a res
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/index`);
})