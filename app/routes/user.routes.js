const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test/all", (req, res) => {
    res.json({ message: "Weight tracker backend" });
  });
  app.post(
    "/api/addweight",
    [authJwt.verifyToken],
    controller.create
  );

  app.get(
    "/api/userweights",
    [authJwt.verifyToken],
    controller.findAllUserWeights
  );

  app.put(
    "/api/editweight",
    [authJwt.verifyToken],
    controller.update
  );

  app.delete(
    "/api/deleteweight",
    [authJwt.verifyToken],
    controller.delete   
  );
};