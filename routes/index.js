var controllers = require(GLOBAL_PATH + "/controllers/api/");

module.exports = function(app) {
  app
    .get("/auth/login", controllers.authController.login)
}