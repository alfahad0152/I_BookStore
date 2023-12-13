'use strict';
const {
  Model
} = require('sequelize');
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
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Email can't be null !"},
        notEmpty:{msg:"Email can't be empty !"},
        isEmail:{msg:"Wrong Email format !"}
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Password can't be null !"},
        notEmpty:{msg:"Password can't be empty !"}
      }
    },
    type: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"User Type can't be null !"},
        notEmpty:{msg:"User Type can't be empty !"}
      }
    },
    active_status: {
      type:DataTypes.BOOLEAN,
      allowNull: false,
      validate:{
        notNull:{msg:"Active Status can't be null !"},
        notEmpty:{msg:"Active Status can't be empty !"}
      }
    },
    otp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName:"user_info"
  });
  return User;
};