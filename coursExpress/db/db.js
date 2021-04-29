// Importation du module installé
var mysql2 = require('mysql2');

// Préparation de la connexion
var db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'formation_db'
});

// Etablissement de la connexion (Erreur de connexion 'catchée')
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connected to db');
});

// mise en place de la variable globale (dans toute l'app) db
// Nous voulons utiliser la même instance de connexion dans les différents modules de l'application
global.db = db; 

module.exports = db;



























