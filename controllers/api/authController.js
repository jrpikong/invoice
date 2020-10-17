module.exports = {
  login: function (req, res) {
    req.checkBody("email", "required").notEmpty();
    req.checkBody("password", "required").notEmpty();
    LIBRARY.co(function* () {
        var validator = yield LIBRARY.function.parameterValidator(req);
        const parameters = {};
        parameters.queryParameters = {};
        parameters.queryParameters.email = req.body.email;

        var user = yield DAO.User.getUser(parameters);
        if (!user) {
          return Promise.reject(LIBRARY.status.ERROR.USER_NOT_FOUND);
        }

        var comparePassword = yield LIBRARY.bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!comparePassword) {
          return Promise.reject(LIBRARY.status.ERROR.USER_PASSWORD_NOT_FOUND);
        }

        var userObject = {
          id: user.id,
          email: user.email,
          role: user.role,
        };
        var token = LIBRARY.jwt.sign({
            user: userObject
          },
          GLOBAL_CONFIG.jwt.secret, {
            expiresIn: GLOBAL_CONFIG.jwt.expirationInSeconds
          }
        );

        user = user.toJSON();
        delete user.password;

        return {
          token,
          user
        };

      }).then(function (results) {
        return LIBRARY.output.responseSuccess(res, results);
      })
      .catch(function (err) {
        return LIBRARY.output.responseError(res, err, "login");
      });
  },

  getUser: function (req, res) {
    LIBRARY.co(function* () {
        const parameters = {};
        parameters.queryParameters = {};
        parameters.queryParameters.id = req.params.id;

        var user = yield DAO.User.getUser(parameters);
        if (!user) {
          return Promise.reject(LIBRARY.status.ERROR.USER_NOT_FOUND);
        }

        user = user.toJSON();
        delete user.password;

        return {
          user
        };

      }).then(function (results) {
        return LIBRARY.output.responseSuccess(res, results);
      })
      .catch(function (err) {
        return LIBRARY.output.responseError(res, err, "login");
      });
  }
}