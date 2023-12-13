'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookorder_info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payment_refno: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      delivery_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      delivery_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customer:{
        type: Sequelize.INTEGER,
        allowNull: false,
        refrences:{model:"customer_info",key:"id"}
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
    await queryInterface.dropTable('bookorder_info');
  }
};