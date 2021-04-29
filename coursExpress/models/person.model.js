var sql = require('./../db/db');

var personModel = {};

personModel.getAllPersons = function(result){
    sql.query("SELECT * FROM person", function(err, res){
        if(err){
            return result(err, null);
        }
        else{
            return result(null, res);
        }
    });
}

personModel.savePerson = function(newPerson, result){
    sql.query("INSERT INTO person SET ?", newPerson, function(err, res){
        if(err){
            return result(err, null);
        }
        else{
            return result(null, res);
        }
    });
}

personModel.findPersonById = function(id, result){
    sql.query("SELECT * FROM person WHERE id = " + id, function(err, rows){
        if(err){
            throw err;
        }
        if(rows.length <= 0){
            return result(err, null);
        }
        else{
            return result(null, rows);
        }
    });
}

personModel.deletePersonById = function(id, result){
    sql.query("DELETE FROM person WHERE id = " + id, function(err, res){
        if(err){
            return result(err, null);
        }
        else{
            return result(null, res);
        }
    });
}

personModel.updatePersonById = function(id, data, result){
    sql.query("UPDATE person SET ? WHERE id = " + id, data, function(err, res){
        if(err)
            result(err, null);
        return result(null, res);
    });
}

module.exports = personModel;









