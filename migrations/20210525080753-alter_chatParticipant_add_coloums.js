'use strict';
const Sequelize = require('sequelize')
const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  /**
   * 
   * @param {QueryInterface} queryInterface 
   * @param {Sequelize} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {

    // Add altering commands here.

    await queryInterface.addColumn(
      'ChatParticipants',
      'deliveredAt', {
      type: DataTypes.DATE,
      allowNull: true,
    }
    );

    await queryInterface.addColumn(
      'ChatParticipants',
      'seenAt', {
      type: DataTypes.DATE,
      allowNull: true,
    }
    );

  },
  /**
    * 
    * @param {QueryInterface} queryInterface 
    * @param {Sequelize} Sequelize 
    */
  down: async (queryInterface, Sequelize) => {
    // Add reverting commands here.


    await queryInterface.removeColumn('ChatParticipants', 'seenAt')
    await queryInterface.removeColumn('ChatParticipants', 'deliveredAt')

  }
};
