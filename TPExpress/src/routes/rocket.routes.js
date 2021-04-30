const controller = require("../controllers/rocket.controller");

module.exports = function(app) {
    app.get("/api/rockets/", controller.getAllRockets);
    app.get("/api/rockets/:id", controller.getRocketById);
    app.post("/api/rockets", controller.addNewRocket);
    app.put("/api/rockets/:id", controller.updateRocketById);
    app.delete("/api/rockets/:id", controller.removeRocketById);
}