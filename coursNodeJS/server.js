// Trois types de modules

// Des modules qui sont définis dans le noyau du nodeJS : pour les utiliser, il faut juste :
        // => require('nomModule');   

// Des modules de la communauté NodeJS : pour les utiliser il faut les télécharger puis les utiliser via la console

// Nos propres modules : Pour les utiliser, il faut les exporter puis les importer avec :
            // => require('./nomModule');

// npm install --save lodash

// Lodash est une bibliothèque JavaScript qui fournit des fonctions utilitaires pour les tâches de programmation courante
// Lodash contient des outils pour simplifier la programmation avec des chaînes, des nombres, des tableaux, des fonctions et des objets de

var math = require('lodash');

// npm i request
// Le module renvoie une fonction qui peut effectuer des requêtes HTTP
const request = require('request');


var mod = require('./mesModules');

var http = require('http');
var url = require('url');
var querystring = require('querystring');
// Utilisation des modules importés

// *******************************************************Création d'un server*****************************************


// Le server attend les clients sur le port 8080
// A la connexion d'un client, le serveur affiche 'Hello World'
// Quand le serveur reçoit une requête sur le port http://localhost:8080/
// Il envoie dans la réponse le message 'Hello World'
//writeHead permet d'écrire à l'netête de la réponse l'état 200 : Tout fonctionne bien


// var server = http.createServer(function(req, res){
//     res.writeHead(200);
//     res.end('Hello World');
// });

// Comment retourner du code html ?

var server = http.createServer(function(req, res){
    res.writeHead(200, { "Content-Type" : "text/html" });
    res.write('<!DOCTYPE html>' +
    '<html>' +
    '   <head>' +
    '       <meta charset="UTF-8" />' +
    '       <title>Ma page Node JS</title>' +
    '   </head>' +
    '   <body>' +
    '       <h1>Hello world</h1>' +
    '   </body>' +
    '</html>'
);
});
// http://localhost:8080/mapage
// http://localhost:8080

var server = http.createServer(function(req, res){
    var page = url.parse(req.url).pathname;
    console.log(page);
    res.writeHead(200, { 
        "Content-Type" : "text/plain"
    });
    res.write('Hello world, this is your requested page : ' + page);
    res.end();
});

// http://localhost:8080?prenom=john&nom=wick

var server = http.createServer(function (req, res) {
    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, { "Content-Type": "text/plain" });
    if ('prenom' in params && 'nom' in params) {
        res.write('Vous etes ' + params['prenom'] + ' ' + params['nom']);
    }
    else {
        res.write('Vous devez bien avoir un prenom et un nom, non ?');
    }
    res.end();
});

// Ecrire un programme qui affiche le résultat d'une addition des nombres passés en paramètre (nbr1 et nbr2)

// http://localhost:8080?nbr1=10&nbr2=27

var server = http.createServer(function (req, res) {
    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, { "Content-Type": "text/plain" });
    if ('nbr1' in params && 'nbr2' in params) {
        nbr1 = parseInt(params['nbr1']);
        nbr2 = parseInt(params['nbr2']);
        res.write('l\'addition de ' + params['nbr1'] + ' et de ' + params['nbr2'] + ' est égale à ' + (nbr1 + nbr2));
    }
    else {
        res.write('<!DOCTYPE html>' +
        '<html>' +
        '   <head>' +
        '       <meta charset="UTF-8" />' +
        '       <title>Ma page Node JS</title>' +
        '   </head>' +
        '   <body>' +
        '       Il n\'y a aucun nombre à additionner là !' +
        '   </body>' +
        '</html>'
           );
    }
    res.end();
});

server.listen(8080);



// **************************************************Fin création d'un server*******************************************


mod.direBonjour();

// La méthode .map () crée un tableau de valeurs et qui prend en 2ème paramètre un callback, ici retourne chaque valeur du tableau * 2
console.log(math.map([1,5,3], function(a){
    return a * 2;
}));

request('https://ghibliapi.herokuapp.com/films', (error, response,body) => {
    // Notre fonction callback vérifie en premier si nous avons reçu une erreur.
    // BEST PRACTICE : consiste à vérifier d'abord s'il y a des erreurs dans un callback afin que l'éxécution du callback ne se poursuive pas avec des données manquantes.
    if(error){
        console.error(`Ne peut pas envoyer de requête à l'API: ${error.message}`);
        return;
    }
    // Nous vérifions ensuite le code de statut de la réponse
    // En vérifiant que le code de statut est 200, cela signifie que la requête était 'ok'

    if(response.statusCode !== 200) {
        console.error(`Code status attendu 200 OK mais reçu: ${response.statusCode}`);
        return;
    }

    console.log('Récupération de la liste des films ...');
    movies = JSON.parse(body); // .parse() en fait un objet
    movies.forEach(movie => {
        console.log(`${movie['title']}, ${movie['release_date']}`);
    })
})









