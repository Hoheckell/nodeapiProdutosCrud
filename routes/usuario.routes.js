const express = require('express');
const sequelize = require("sequelize");
const DataTypes = require("sequelize");
const userRoute = express.Router();
const Usuario = require('../models/Usuario')(sequelize, DataTypes);
const verifyToken = require('../routes/accessmiddleware');
// Todos Usuarios
userRoute.route('/').get(verifyToken,(req, res) => {
  Usuario.findAll().then(usuarios => {
      return res.json(usuarios);
      res.sendStatus(200);
    }).catch(err => {
      console.error(err)
    })
},verifyToken);

// Um Usuario
userRoute.route('/:id').get(verifyToken,(req, res) => {
  console.log('headers:', res.headers);
  Usuario.findByPk(req.params.id).then(usuario => {
    return res.json(usuario);
    res.sendStatus(200);
  }).catch(err => {
    console.error(err)
  });
});


// Atualiza Usuario
userRoute.route('/:id/update').put(verifyToken,(req, res, next) => {
  let updateValues = req.body;
    Usuario.update(updateValues,
      {where:{id:req.params.id}}, (error, data) => {
        if (error) {
          return next(error);
          console.log(error)
        } else {
          return res.json(data)
          console.log('Book updated successfully!')
        }
    });
});

// Deleta Usuario
userRoute.route('/:id/delete').delete(verifyToken,(req, res, next) => {
  Usuario.destroy({where:{id:req.params.id}}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  });
});


module.exports = userRoute;