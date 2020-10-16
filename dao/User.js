module.exports = {
  getUsers: function (parameters) {
    return new Promise((resolve, reject) => {
      MODELS.User.findAll({
          where: parameters.queryParameters || {},
          attributes: parameters.attributes || {},
          order: parameters.order || [],
          include: parameters.include || []
        })
        .then(users => {
          // Remove password from user object
          const editedUsers = users.map(function (user) {
            user = user.get({
              plain: true
            });
            delete user.password;

            return user;
          });

          resolve(editedUsers);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getUser: function (parameters, t) {
    return new Promise((resolve, reject) => {
      MODELS.User.findOne({
          where: parameters.queryParameters || {},
          attributes: parameters.attributes || {},
          include: parameters.include || [],
          transaction: t,
          lock: t ? t.LOCK.UPDATE : null
        })
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}