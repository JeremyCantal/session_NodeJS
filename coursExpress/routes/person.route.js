var express = require('express');
// La fonction suivante permet de définir des routes dans une application Express
var router = express.Router();
var personController = require('./../controllers/person.controller');

// router.get('/add', function(req, res) {
//     res.send('Ajout personne');
// });

// router.get('/edit', function(req, res) {
//     res.send('Editer personne');
// });

// router.get('/search', function(req, res) {
//     res.send('Rechercher personne');
// });

//http://localhost:8080/person/show
router.get('/show', personController.show);

// http://localhost:8080/person/1
router.get('/:id', personController.findById);

// http://localhost:8080/person/save
router.post('/save', personController.save);

// http://localhost:8080/person/1
router.delete('/:id', personController.deleteById);

// http://localhost:8080/person/1
router.put('/:id', personController.update);


module.exports = router;



























