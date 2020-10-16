module.exports = {
  login: function (req, res) {
    const parameters = {};

    parameters.queryParameters = {};
    parameters.queryParameters.email = req.body.email;

    var user = yield DAO.User.getUser(parameters);
    console.log(user.name);
    return res.json({
      "fd": "fd"
    });
  }
}