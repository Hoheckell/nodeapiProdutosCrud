const { Sequelize, DataTypes } = require('sequelize');
const sql = new Sequelize('postgres://postgres:b26a53c0f6e34bd495fe8c830ae7ddfa@localhost:5432/faztudo', {logging: false});
let Servico = require('../models/Servico');

module.exports = (Sequelize, DataTypes) => {
    const Usuario = sql.define('Usuario', {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
        }
    }, {
        sql, // We need to pass the connection instance
        modelName: 'Usuario',
        tableName: 'usuarios'
    });
    Usuario.associate = (models) => {
        Usuario.hasMany(Servico, {
            through: 'usuario_servicos',
            foreignKey: "usuário_id"
        });
    }
    return Usuario;
}