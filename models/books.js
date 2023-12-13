'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    static associate(models) {
      Books.belongsTo(models.Category,{
        foreignKey:"category" , as:"book_cate"
      })
      Books.belongsTo(models.BookSeller,{
        foreignKey:"seller" , as:"book_seller"
      })
    }
  }
  Books.init({
    book_name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Book Name can't be Null !"},
        notEmpty:{msg:"Book Name can't be Empty !"},
      }
    },
    publisher_name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Publisher Name can't be Null !"},
        notEmpty:{msg:"Publisher Name can't be Empty !"},
      }
    },
    author_name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Author Name can't be Null !"},
        notEmpty:{msg:"Author Name can't be Empty !"},
      }
    },
    selling_price: {
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:{msg:"Selling Price can't be Empty !"},
        isNumeric:{msg:"Selling Price Will always be numeric value !"}
      }
    },
    rental_price:{
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:{msg:"Rental Price can't be Empty !"},
        isNumeric:{msg:"Rental Price Will always be numeric value !"}
      }
    },
    image: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Image can't be Null !"},
        notEmpty:{msg:"Image Name can't be Empty !"},
      }
    },
    status: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notNull:{msg:"Book Status can't be Null !"},
        notEmpty:{msg:"Book Status can't be Empty !"},
      }
    },
    isoldbook:{ 
      type:DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notNull:{msg:"Book Isold Status can't be null !"},
        notEmpty:{msg:"Book Isold Status can't be empty !"}
      }
    },
    trans_type: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Transactions type can't be Null !"},
        notEmpty:{msg:"Transactions type Stat can't be Empty !"},
      }
    }
  }, {
    sequelize,
    modelName: 'Books',
    tableName:"books_info"
  });
  return Books;
};