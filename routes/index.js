var controllers = require(GLOBAL_PATH + "/controllers/api/");

module.exports = function (app) {
  app
    .post("/auth/login", controllers.authController.login)
    .use("/", MIDDLEWARE.validateToken)
    .get('/auth/getUser/:id', controllers.authController.getUser)
}