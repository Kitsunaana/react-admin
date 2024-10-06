'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'CategoryCharacteristics',
      'CategoryCharacteristics_categoryId_key',
    );

    await queryInterface.removeConstraint(
      'CategoryCharacteristics',
      'CategoryCharacteristics_characteristicId_unitId_key',
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addConstraint('CategoryCharacteristics', {
      fields: ['categoryId'],
      type: 'unique',
      name: 'CategoryCharacteristics_categoryId_key',
    });

    await queryInterface.addConstraint('CategoryCharacteristics', {
      fields: ['unitId'],
      type: 'unique',
      name: 'CategoryCharacteristics_characteristicId_unitId_key',
    });
  },
};
