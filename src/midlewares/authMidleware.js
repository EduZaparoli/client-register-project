import jwt from "jsonwebtoken";
import * as fs from "fs";
const authConfig = JSON.parse(fs.readFileSync('./src/config/auth.json'));

async function autentica(req, res, next) {
    const auth = req.headers.authorization;

    if(!auth){
        return res.status(401).send({message: "O token de autenticação não existe!"});
    }

    const partesToken = auth.split(' ');

    if(!partesToken.length === 2){
        return res.status(401).send({message: "Erro de token"});
    }

    const [scheme, token] = partesToken;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({message: "Token mal formatado"});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({message: "Token inválido"});
        }

        req.userId = decoded.id;
        return next();
    });
}

export default autentica