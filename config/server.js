//importar o módulo do framework express
var express = require('express');

//importar o módulo consign
var consign = require('consign');

//importar o módulo body-parser
var bodyParser = require('body-parser');

//importar o módulo express validator
var expressValidator = require('express-validator');

//iniciar o objeto do express
var app = express();

//setar as variáveis 'view engine' e 'views' do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

//configurar os middleware express.static
app.use(express.static('./app/public'));

//configurar os middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

//configurar os middleware express validator
app.use(expressValidator());

//efetua o autoload das rotas, dos models e dos controllers para o obejto app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

//exportador do objeto app
module.exports = app;

