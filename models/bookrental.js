'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookRental extends Model {

    static associate(models) {
      BookRental.belongsTo(models.Customer,{
        foreignKey:"customer" , as:"customer_info"
      })
      BookRental.belongsTo(models.Books,{
        foreignKey:"book" , as:"book_info"
      })
    }
  }
  BookRental.init({
    start_date: {
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        notNull:{msg:"Start Date can't be Null !"},
        notEmpty:{msg:"Start Date can't be Empty !"}
      }
    },
    end_date: {
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        notNull:{msg:"End Date can't be Null !"},
        notEmpty:{msg:"End Date can't be Empty !"}
      }
    },
    amount: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"Amount can't be Null !"},
        notEmpty:{msg:"Amount can't be Empty !"},
        isNumeric:{msg:"Amount will always be a numeric value !"}
      }
    },
    issubmitted: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notNull:{msg:"Submitted Status can't be Null !"},
        notEmpty:{msg:"Submitted Status can't be Empty !"}
      }
    },
    submit_date: {
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Submitted Date can't be Empty !"}
      }
    }
  }, {
    sequelize,
    modelName: 'BookRental',
    tableName:"book-rental_info"
  });
  return BookRental;
};