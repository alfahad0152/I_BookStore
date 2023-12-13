'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      
    }
  }
  Category.init({
    cate_name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:" Category Name can't be Null !"},
        notEmpty:{msg:"Category Name can't be Empty !"}
      }
    },
    desc: DataTypes.STRING,
    status: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notNull:{msg:" Category Status can't be Null !"},
        notEmpty:{msg:"Category Status can't be Empty !"}
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName:'cate_info'
  });
  return Category;
};