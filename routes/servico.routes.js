const express = require('express');
const serviceRoute = express.Router();
const sequelize = require("sequelize");
const {DataTypes} = require("sequelize");
const Servico = require('../models/Servico')(sequelize, DataTypes);;
const verifyToken = require('../routes/accessmiddleware');
// Adiciona serviço
serviceRoute.route('/add-servico').post(verifyToken,(req, res, next) => {
        Servico.create(req.body).then((servico)=>{ 
            res.status(200).send(JSON.stringify(servico));  
        }).catch((err)=>{
            res.send(err);
        }); 
  });
// Todos Serviços
serviceRoute.route('/').get(verifyToken,(req, res) => {
    Servico.findAll().then(servicos => {
      return res.json(servicos);
      res.sendStatus(200);
    }).catch(err => {
      console.error(err)
    })
});

// Um Serviço
serviceRoute.route('/:id').get(verifyToken,(req, res) => {
    Servico.findByPk(req.params.id).then(servico => {
      return res.json(servico);
        res.sendStatus(200);
  }).catch(err => {
        console.error(err)
    })
});


// Atualiza serviço
serviceRoute.route('/:id/update').put(verifyToken,(req, res, next) => {
  let updateValues = req.body;
  Servico.update(updateValues,
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
serviceRoute.route('/:id/delete').delete(verifyToken,(req, res, next) => {
    Servico.destroy({where:{id:req.params.id}}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  });
});


module.exports = serviceRoute;