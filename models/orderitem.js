'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
  
    static associate(models) {
      OrderItem.belongsTo(models.BookOrder,{
        foreignKey:"bookorder" , as: "item_order"
      })
      OrderItem.belongsTo(models.Books,{
        foreignKey:"book" , as :"item_book"
      })
    }
  }
  OrderItem.init({
    amount: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"Amount Can't be null !"},
        notEmpty:{msg:"Amount can't be empty !"},
        isNumeric:{msg:"Amount will always be numeric value !"}
      }
    },
    quantity: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"Quantity Can't be null !"},
        notEmpty:{msg:"Quantity can't be empty !"},
        isNumeric:{msg:"Quantity will always be numeric value !"}
      }
    }
  }, {
    sequelize,
    modelName: 'OrderItem',
    tableName: "orderitem_info"
  });
  return OrderItem;
};