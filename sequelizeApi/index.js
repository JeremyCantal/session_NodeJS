const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./src/models");
const user = db.user;
db.sequelize.sync();

// db.sequelize.sync({ force: true}).then(() => {
//   console.log('Drop and re-sync db.');
//   initial();
// })

app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

function initial() {
  user.create({
    id:1,
    nom:"NOM1",
    prenom:'PRENOM1'
  });
  user.create({
    id:2,
    nom:"NOM2",
    prenom:'PRENOM2'
  });
  user.create({
    id:3,
    nom:"NOM3",
    prenom:'PRENOM3'
  });
}

require('./src/routes/post.routes')(app);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to our application." });
  });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});