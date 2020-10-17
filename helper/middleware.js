module.exports = {
  validateToken: async function (req, res, next) {
    var token = req.headers.token || req.body.token || req.query.token;
    var secret = GLOBAL_CONFIG.jwt.secret;

    if (!token) {
      return LIBRARY.output.responseError(res, LIBRARY.status.ERROR.TOKEN_REQUIRED, 'validateToken');
    }

    LIBRARY.jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        return LIBRARY.output.responseError(res, LIBRARY.status.ERROR.TOKEN_EXPIRED, 'validateToken');
      } else {
        next();
      }
    });
  },
}