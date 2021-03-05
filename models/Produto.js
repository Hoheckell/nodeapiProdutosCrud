const { Sequelize, DataTypes } = require('sequelize');
const sql = new Sequelize('postgres://postgres:b26a53c0f6e34bd495fe8c830ae7ddfa@localhost:5432/produtos', {logging: false});

const Produto = sql.define('Produto', {
    // Model attributes are defined here
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preco: {
      type: DataTypes.DOUBLE(10, 2) ,
      allowNull: false
    },
    quantidade: {
      type: DataTypes.DOUBLE(10, 2) ,
      allowNull: false
    }
  }, {
    sql, // We need to pass the connection instance
    modelName: 'Produto',
    tableName: 'products'
  });
  
module.exports = sql.model('Produto', Produto);