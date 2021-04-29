// Express.js est un framework pour construire des applicationsweb basées sur nodeJS
// C'est de fait le framework standard pour le développement de serveur (Back-End) en node.JS

const { request } = require('express');
var express = require('express');
var person = require('./routes/person.route');
var app = express();

app.use(express.json());
// accessible via req.body
app.use(express.urlencoded());

// Un Middleware est essentiellement une fonction qui recevra les objets request et responses
// et comme 3ème argument , une autre fonction next() que l'on appelera une fois notre code middleware terminé.

var middleware1 = function(req, res, next){
    console.log('middleware 1 : ', req.url);
    next();
}

var middleware2 = function(req, res, next){
    console.log('middleware 2 : ', req.url);
    next();
}

var myLogger = function(req, res, next){
    console.log('Vous êtes connecté');
    next();
}

var requestTime = function(req, res, next){
    req.requestTime = new Date(Date.now());
    next();
}

app.use(middleware1);
app.use(middleware2);
app.use(myLogger);
app.use(requestTime);


// get et post sont des méthodes HTTP
// '/' est la route
// res.send(...) est l'instruction permettant de retourner une réponse au client


// Envoie dans la réponse ' Hello World ' lorsqu'une requête GET (via postman) est envoyée et récupère l'heure de réception de la requête
// par l'appel du middleware requestTime
app.get('/', (req, res) => {
    console.log('requête reçu !');
    var responseText = 'Hello World';
    responseText += ' appelé à : ' + req.requestTime + '';
    res.send(responseText);
});


app.post('/', function(req, res) {
    res.send('Post request');
});

// http://localhost:8080/person/add
// http://localhost:8080/person/edit
// http://localhost:8080/person/search
app.use('/person', person);

app.get('/personne', function(req, res) {
    res.send('Bonjour personne');
});

// La fonction app.lesten() est utilisée pour lier et écouter les connexion sur l'hôte et le port spécifié
app.listen(8080, function(){
    console.log('Express en attente');
});























