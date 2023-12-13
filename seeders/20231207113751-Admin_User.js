'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('user_info',[{
        email: "admin@istore.com",
        password: "12345",
        type: "Admin",
        active_status : true,
        otp: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
