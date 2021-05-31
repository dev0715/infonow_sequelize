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
      'Messages',
      'content', {
      type: DataTypes.TEXT,
      allowNull: false
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
    await queryInterface.removeColumn('Messages', 'content');

  }
};
