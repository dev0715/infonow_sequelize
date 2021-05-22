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
    return queryInterface.sequelize.transaction(t => {
      return queryInterface.removeColumn('Messages', '_messageId').then(() => {
        queryInterface.changeColumn('Messages', 'messageId', {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        }, { transaction: t }).then(() => t.commit()).catch(e => t.rollback())
      }).catch(e => t.rollback())
    })





  },

  /**
   * 
   * @param {QueryInterface} queryInterface 
   * @param {Sequelize} Sequelize 
   */
  down: async (queryInterface, Sequelize) => {

    // Add reverting commands here.
    return queryInterface.sequelize.transaction(t => {
      return queryInterface.changeColumn('Messages', 'messageId', {
        type: DataTypes.UUIDV4,
        primaryKey: false,
        allowNull: false,
        unique: true
      }, { transaction: t }).then(() => {
        queryInterface.addColumn(
          'Messages',
          '_messageId', {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          allowNull: false
        }, { transaction: t }
        ).then(() => t.commit()).catch(e => t.rollback())
      }).catch(e => t.rollback())
    })
  }
};
