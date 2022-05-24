import express from "express";
import path from "path";
import clientes from "./clientesRoutes.js";
import bodyParser from "body-parser";

const __dirname = path.resolve();

const routes = (app) => {
    app.route("/index").get((req, res) => {
        res.status(200).sendFile(__dirname + "/src/view/index.html");
    })

    app.route("/cadastro").get((req, res) => {
        res.status(200).sendFile(__dirname + "/src/view/cadastro.html");
    })

    app.use(
        express.json(),
        clientes
    )

}

export default routes;