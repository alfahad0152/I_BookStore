'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookOrder extends Model {
    static associate(models) {
      BookOrder.belongsTo(models.Customer,{
        foreignKey:"customer" , as:"customer_info"
      })
    }
  }
  BookOrder.init({
    order_date: {
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        notNull:{msg:"Order Date can't be null !"},
        notEmpty:{msg:"Order Date can't be Empty !"}
      }
    },
    amount: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"Amount can't be null !"},
        notEmpty:{msg:"Amount can't be Empty !"},
        isNumeric:{msg:"Amount will always be numeric value !"}
      }
    },
    payment_refno: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Payment Ref.No. can't be null !"},
        notEmpty:{msg:"Payment Ref.No. can't be Empty !"},
        isNumeric:{msg:"Payment Ref.No. will always be numeric value !"}
      }
    },
    delivery_address: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Delivery Address can't be null !"},
        notEmpty:{msg:"Delivery Address can't be Empty !"},
      }
    },
    delivery_status: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Delivery Status can't be null !"},
        notEmpty:{msg:"Delivery Stauts can't be Empty !"},
      }
    }
  }, {
    sequelize,
    modelName: 'BookOrder',
    tableName:'bookorder_info'
  });
  return BookOrder;
};