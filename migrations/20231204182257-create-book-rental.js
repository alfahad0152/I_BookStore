'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('book-rental_info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      issubmitted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      submit_date: {
        type: Sequelize.DATE
      },
      customer:{
        type: Sequelize.INTEGER,
        allowNull: false,
        refrences:{model:"customer_info",key:"id"}
      },
      book:{
        type: Sequelize.INTEGER,
        allowNull: false,
        refrences:{model:"books_info",key:"id"}
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
    await queryInterface.dropTable('book-rental_info');
  }
};