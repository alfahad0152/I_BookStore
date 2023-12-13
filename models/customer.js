'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    
    static associate(models) {
      Customer.belongsTo(models.User,{
        foreignKey:"user"
      })
    }
  }
  Customer.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Name can't be null !"},
        notEmpty:{msg:"Name can't be empty !"},
      }
    },
    address: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{msg:"Address can't be empty !"}
      }
    },
    phone: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Phone No. can't be null !"},
        notEmpty:{msg:"phone No. can't be empty !"},
        len:{args:[10,10],msg:" Wrong Phone No. format !"}
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Email can't be null !"},
        notEmpty:{msg:"Email can't be empty !"},
        isEmail:{msg:"Wrong Email format !"}
      }
    }
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: "customer_info",
  });
  return Customer;
};