var personModel = require('./../models/person.model');

var personController = function(){
}


personController.show = function(req, res){
    personModel.getAllPersons(function(err, result){
        if(err){
            throw err;
        }
        res.json({
            status: 200,
            result,
            message: "Success getAllPersons"
        });
    });
}

personController.findById = function(req, res, next){

    let id = req.params.id;

    personModel.findPersonById(id, function(err, result){
        try{
            if(result == null){
                throw err;
            }
            res.json({
                status: 200,
                result,
                message: "Success findById"
            });
        }
        catch(err){
            next(err);
        }
    });
}

personController.save = function (req, res) {

    let data = {
        nom:req.body.nom,
        prenom:req.body.prenom,
        salaire:req.body.salaire,
        ville:req.body.ville
    };

    personModel.savePerson(data, function (err, result) {
        if (err)
            throw err;
        res.json({
            status: 200,
            result,
            message: "Success save"
        });

    });

}

personController.deleteById = function(req, res, next){
    let id = req.params.id;

    personModel.deletePersonById(id, function(err, result){
        try{
            if(result == null){
                throw err;
            }
            res.json({
                status: 200,
                result,
                message: "Success deleteById"
            });
        }
        catch(err){
            next(err);
        }
    });
}

personController.update = function(req, res){
    let id = req.params.id;
    let data = {
        nom:req.body.nom,
        prenom:req.body.prenom,
        salaire:req.body.salaire,
        ville:req.body.ville
    };

    personModel.updatePersonById(id, data, function(err, result){
        try{
            if(result == null){
                throw err;
            }
            res.json({
                status: 200,
                result,
                message: "Success update"
            });
        }
        catch(err){
            next(err);
        }
    });
}

module.exports = personController;













