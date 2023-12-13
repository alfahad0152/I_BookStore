'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookseller_info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reg_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      gst_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      user:{
        type:Sequelize.INTEGER,
        allowNull:false,
        refrences:{model:"user_info",key:"id"}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookseller_info');
  }
};