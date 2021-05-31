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

    await queryInterface.removeColumn('Messages', 'seenAt')
    await queryInterface.removeColumn('Messages', 'status')




  },
  /**
    * 
    * @param {QueryInterface} queryInterface 
    * @param {Sequelize} Sequelize 
    */
  down: async (queryInterface, Sequelize) => {
    // Add reverting commands here.
    await queryInterface.addColumn(
      'Messages',
      'seenAt', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
    );
    await queryInterface.addColumn(
      'Messages',
      'status', {
      type: DataTypes.ENUM("sent", "delivered", "seen", "deleted"),
      allowNull: false,
      defaultValue: "sent"
    }
    );

  }
};
