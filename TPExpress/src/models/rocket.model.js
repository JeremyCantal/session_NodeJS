module.exports = (sequelize, Sequelize) => {
    const rocket = sequelize.define('rockets', {

        nom: {
            type: Sequelize.STRING
        },
        annee: {
            type: Sequelize.STRING
        },
        organisation: {
            type: Sequelize.STRING
        },
        destination:{
            type: Sequelize.STRING
        }
    });
    return rocket;
}