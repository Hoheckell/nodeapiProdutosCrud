const express = require('express');
const app = express();
const config = require('config');
const jwt = require('jsonwebtoken'); 

const prodRoute = express.Router();
let Produto = require('../models/Produto');

// Adiciona Produto
prodRoute.route('/add-produto').post((req, res, next) => {
  Produto.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).then(produtos => {
    return res.json(produtos);
    res.sendStatus(200);
  }).catch(err => {
    console.error(err)
  })
});

// Todos Produtos
prodRoute.route('/').get((req, res) => {
    Produto.findAll().then(produtos => {
      return res.json(produtos);
      res.sendStatus(200);
    }).catch(err => {
      console.error(err)
    })
});

// Um produto
prodRoute.route('/produto/:id').get((req, res) => {
    Produto.findByPk(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      return res.json(data)
    }
  }).then(produtos => {
    return res.json(produtos);
    res.sendStatus(200);
  }).catch(err => {
    console.error(err)
  })
})


// Atualiza Produto
prodRoute.route('/update-produto/:id').put((req, res, next) => {
  let updateValues = req.body;
    Produto.update(updateValues, {
      where:{id:req.params.id}
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      return res.json(data)
      console.log('Book updated successfully!')
    }
  }).then(produtos => {
    return res.json(produtos);
    res.sendStatus(200);
  }).catch(err => {
    console.error(err)
  })
})

// Deleta Produto
prodRoute.route('/delete-produto/:id').delete((req, res, next) => {
    Produto.destroy({where:{id:req.params.id}}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  }).then(produtos => {
    return res.json(produtos);
    res.sendStatus(200);
  }).catch(err => {
    console.error(err)
  })
})

//generateToken jwt
prodRoute.route("/user/generateToken").post((req, res) => { 
  // Validate User Here 
  // Then generate JWT Token 

  let jwtSecretKey = config.get('jwt.JWT_SECRET_KEY'); 
  let data = { 
      time: Date(), 
      userId: 12, 
  } 

  const token = jwt.sign(data, jwtSecretKey); 

  res.send(token); 
});

//validate jwt token
prodRoute.route("/user/validateToken").get((req, res) => { 
    // Tokens are generally passed in the header of the request 
    // Due to security reasons. 
   
    let jwtSecretKey = config.get('jwt.JWT_SECRET_KEY'); 
  
    try { 
      console.log(req.header('token'));
        const token = req.header('token'); 
  
        const verified = jwt.verify(token, jwtSecretKey); 
        if(verified){ 
            return res.send("Successfully Verified"); 
        }else{ 
            // Access Denied 
            return res.status(401).send(error); 
        } 
    } catch (error) { 
        // Access Denied 
        return res.status(401).send(error); 
    } 
});

module.exports = prodRoute;