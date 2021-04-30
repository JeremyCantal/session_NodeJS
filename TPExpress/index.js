const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./src/models");
const rocket = db.rocket;
db.sequelize.sync();

// db.sequelize.sync({ force: true}).then(() => {
//   console.log('Drop and re-sync db.');
//   initial();
// })

app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

function initial() {
    rocket.create({
        id:1,
        nom:"Falcon Heavy",
        annee:"2017",
        organisation: "Space X",
        destination: "Satellites lourds en orbite basse et géostationnaire, sondes interplanétaires"
    });
    rocket.create({
        id:2,
        nom:"Crew Dragon",
        annee:"2019",
        organisation: "Space X",
        destination: "Mars"
    });
    rocket.create({
        id:3,
        nom:"Raptor",
        annee:"2021",
        organisation: "Space X",
        destination: "Superamas de la Vierge"
    });
}

require('./src/routes/rocket.routes')(app);


app.get("/", (req, res) => {
    res.json({ message: "Au top" });
  });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});