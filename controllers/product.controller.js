const Product = require('../models/product.model');
const HTTP = require('../lib/http_errors');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
class ProductController {
  list(req, res) {
    try {
      Product.find((err, product) => {
        if (err)
          throw ('error listing products')

        res.send(product);
      })
    } catch (e) {
      res.status(e.code).send({
        code: e.code,
        error: e.status,
        message: e.message
      })
    }
  }

  create(req, res) {
    try {
      if (!req.body.name)
        throw ({
          code: 400,
          status: 'UNSUPPORTED TYPE',
          message: 'name parameter not found'
        })

      if (!req.body.price)
        throw ({
          code: 400,
          status: 'UNSUPPORTED TYPE',
          message: 'price parameter not found'
        })

      let product = new Product({
        name: req.body.name,
        price: req.body.price
      });

      product.save(function (err) {
        if (err) {
          throw ({
            code: 500,
            status: 'UNSUPPORTED TYPE',
            message: err
          });
        }
        res.send({
          code: 200,
          status: 'SUCESS',
          message: `product [${req.body.name}] created successfully.`
        })
      })
    } catch (e) {
      res.status(e.code).send({
        code: e.code,
        error: e.status,
        message: e.message
      })
    }
  }

  details(req, res) {
    try {
      if (!req.params.id)
        throw ({
          code: 404,
          status: 'NOT FOUND',
          message: 'missing id parameter'
        })

      Product.findById(req.params.id, function (err, product) {
        console.log(err, product);

        if (err || product == null)
          throw ({
            code: 404,
            status: 'NOT FOUND',
            message: 'invalid ID'
          })

        res.send(product);
      })

    } catch (e) {

      console.log(e)
      res.end()
      // res.status(e.code).send({
      //   code: e.code,
      //   error: e.status,
      //   message: e.message
      // })
    }
  }
}

module.exports = ProductController;