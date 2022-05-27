import express from "express";
import path from "path";
import clientes from "./clientesRoutes.js";

const __dirname = path.resolve();

const routes = (app) => {
    app.route("/login").get((req, res) => {
        res.status(200).sendFile(__dirname + "/src/view/login.html");
    })

    app.route("/cadastro").get((req, res) => {
        res.status(200).sendFile(__dirname + "/src/view/cadastro.html");
    })

    app.route("/logado").get((req, res) => {
        res.status(200).sendFile(__dirname + "/src/view/logado.html");
    })

    app.use(
        express.json(),
        clientes
    )

}

export default routes;