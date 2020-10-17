'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users'
  });
  User.associate = function (models) {
    // associations can be defined here
  };

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.beforeSave((user, options) => {
    const {
      password
    } = user;

    var saltRounds = 10;
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
    user.password = hash;
  });

  User.beforeBulkCreate((users, options) => {
    for (const user of users) {
      const {
        password
      } = user;

      var saltRounds = 10;
      var salt = bcrypt.genSaltSync(saltRounds);
      var hash = bcrypt.hashSync(password, salt);
      user.password = hash;
    }
  });

  User.beforeBulkUpdate((users, options) => {
    for (const user of users) {
      const {
        password
      } = user;

      var saltRounds = 10;
      var salt = bcrypt.genSaltSync(saltRounds);
      var hash = bcrypt.hashSync(password, salt);
      user.password = hash;
    }
  });
  
  return User;
};