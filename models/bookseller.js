'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookSeller extends Model {
    static associate(models) {
      BookSeller.belongsTo(models.User,{
        foreignKey:"user"
      })
    }
  }
  BookSeller.init({
    company_name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Company Name can't be null !"},
        notEmpty:{msg:"Company Name can't be empty !"}
      }
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Company Address can't be null !"},
        notEmpty:{msg:"Company Address can't be empty !"}
      }
    },
    phone: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Company Phone No. can't be null !"},
        notEmpty:{msg:"Company Phone No. can't be empty !"},
        len:{args:[10,10],msg:"Wrong Phone No. format !"}
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Company Email can't be null !"},
        notEmpty:{msg:"Company Email can't be empty !"},
        isEmail:{msg:"Wrong Email format !"}
      }
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Name can't be null !"},
        notEmpty:{msg:"Name can't be empty !"}
      }
    },
    reg_no: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Company Reg. No. can't be null !"},
        notEmpty:{msg:"Company Reg. No. can't be empty !"}
      }
    },
    gst_no: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Company Gst. No. can't be null !"},
        notEmpty:{msg:"Company Gst. No. can't be empty !"},
            }
    },
  }, {
    sequelize,
    modelName: 'BookSeller',
    tableName: "bookseller_info"
  });
  return BookSeller;
};