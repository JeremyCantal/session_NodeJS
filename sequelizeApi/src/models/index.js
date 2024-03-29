const dbConfig = require("./../config/db.config");

const Sequelize = require("sequelize");

// Sequelize est un ORM pour node.js compatible avec différents moteurs de base de données comme Mysql, sqlite... etc.
// ORM => Object Relational Mapping.
// Technique de programmation faisant le lien entre le monde de la BDD (Mysql) et le mode de la programmation objet.(nodeJS).
// Elle permet de transformer un objet en une table facilement manipulable via ses attributs.


// Initialisation d'une nouvelle instance de connexion à Mysql avec les paramètres récupérés du module db.config.js
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

// Mise en place de la connexion
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import des entités à mapper (création table user avec ses propriétés dans db) dans la db formation_db

db.user = require('../models/user.model')(sequelize, Sequelize);
db.post = require('../models/post.model')(sequelize, Sequelize);

// Mise en place de la relation entre User et posts
// Un user peut avoir un ou plusieurs posts (ONETOMANY)

db.user.hasMany(db.post, { as: 'posts' });

// Mise en place de la clé étrangère userId (clé primaire id dans user)
// Pour la relation USER => POSTS
db.post.belongsTo(db.user, {
    foreignKey: "userId",
    as: "users",
});

module.exports = db;









