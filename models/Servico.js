const { Sequelize, DataTypes,Model } = require('sequelize');
const sql = new Sequelize('postgres://postgres:b26a53c0f6e34bd495fe8c830ae7ddfa@localhost:5432/faztudo', {logging: false});
const Usuario = require('../models/Usuario');

module.exports = (Sequelize, DataTypes) => {
    const Servico = sql.define('Servico', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sql,
        modelName: 'Servico',
        tableName: 'servicos',
        timestamps: false
    });
    Servico.associate = (models) => {
        Servico.belongsToMany(Usuario, {
            through: 'usuario_servicos',
            foreignKey: "servico_id"
        });
    }
    return Servico;
}