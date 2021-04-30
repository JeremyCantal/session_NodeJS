const rocket = require("../models").rocket;

module.exports = {

    async getAllRockets(req, res) {
        try {
            const rocketCollection = await rocket.findAll({
                id: req.params.rocketId
            });
            if (rocketCollection) {
                res.status(201).send(rocketCollection);
            }
            else {
                res.status(404).send("Rocket Not Found")
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }

    },

    async getRocketById(req, res) {
        const id = req.params.id;
        try {
            const rocketId = await rocket.findOne(({
                where: { id: id }
            }))
            if (rocketId) {

                res.status(201).send(rocketId);
            }
            else {
                res.status(404).send("Rocket Not Found")
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }

    },

    async addNewRocket(req, res) {

        try {
            const rocketCreated = await rocket.create({
                nom:req.body.nom,
                annee:req.body.annee,
                organisation:req.body.organisation,
                destination:req.body.destination,
                rocketId: req.params.rocketId
            });
            if (rocketCreated) {
                res.status(201).send(rocketCreated)
            }
            else {
                res.status(404).send("Rocket Not Found")
            }

        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },

    async updateRocketById(req, res) {
        const id = req.params.id;
        try {
            const rocketId = await rocket.findOne(({
                where: { id: id }
            }))
            if (rocketId) {
                const updatedRocket = await rocketCollection.update({
                    rocketId: req.params.rocketId,
                    nom:req.body.nom,
                    annee:req.body.annee,
                    organisation:req.body.organisation,
                    destination:req.body.destination
                })
                res.status(201).send(updatedRocket);
            }
            else {
                res.status(404).send("Rocket Not Found");
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }

    },

    async removeRocketById(req, res) {
        const id = req.params.id;
        try {
            const rocketId = await rocket.findOne(({
                where: { id: id }
            }))
            if (rocketId) {
                rocketId.destroy();
                res.status(201).send("Rocket has been deleted");
            }
            else {
                res.status(404).send("Rocket Not Found");
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }

    }
}
























