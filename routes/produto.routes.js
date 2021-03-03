const express = require('express');
const app = express();

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

module.exports = prodRoute;