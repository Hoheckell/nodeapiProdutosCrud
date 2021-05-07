const express = require('express');
const app = express();
const config = require('config');
const jwt = require('jsonwebtoken');
const sequelize = require("sequelize");
const {DataTypes} = require("sequelize");
const Usuario = require('../models/Usuario')(sequelize, DataTypes);
const freeRoute = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Adiciona Usuario
freeRoute.route('/add-user').post((req, res, next) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        console.log(req.body);
      bcrypt.hash(req.body.password, salt, function(err, hash) {    
        req.body.password = hash;    
        Usuario.create(req.body).then((user)=>{
            res.status(200).send(user);
        }).catch((err)=>{
            res.send(err);
        });
      });
    });
  });
// Login Usuario
freeRoute.route('/login').post((req, res, next) => {
    if (req.body.email && req.body.password) {
      Usuario.findOne({where:{ email: req.body.email}}).then((user) => {
        if(user == null){
          res.sendStatus(404);
        } else {
          bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(result === true){
              let token = generateToken(user.id); 
              res.send({"token":token,"email":user.email});
            }else{
              res.send({"success":false});
            }
          });
        }
      }).catch((err)=>{
        res.send(err);
      })
    }else{
      var err = new Error('Acesso Negado!');
      err.status = 401;
      return next(err);
    }
  });

//generateToken jwt
const generateToken = (id) => { 
    // Validate User Here 
    // Then generate JWT Token 
  
    let jwtSecretKey = config.get('jwt.JWT_SECRET_KEY'); 
    let data = { 
        time: Date(), 
        userId: id, 
    } 
    const token = jwt.sign(data, jwtSecretKey, {expiresIn: '1h'});
  
    return token; 
}
module.exports = freeRoute;