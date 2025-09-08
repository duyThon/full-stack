'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'KXt0y@example.com',
        password: '123456',
        firstName: 'Nguyen',
        lastName: 'Thanh',
        address: 'Ha Noi',
        gender: 1,
        roleId: 'R1',
        phoneNumber: '0123456789',
        positionId: 'P1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
