const express = require ('express');
const consign = require ('consign');
const bodyParser = require ('body-parser');

// customiza o app express e o devolve para o arquivo principal 
module.exports = () => { 

    const app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    
    // faz uso dos dados da pasta controller dentro de app 
    // poderia utilizar module.exports ?????  Acho que sim 
    consign()
    .include('controllers')
    .into(app);

    return app;
}
