const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product.controller');
const Product = new ProductController


router.get('/', Product.list);
router.post('/', Product.create);
router.get('/:id', Product.details);
// router.put('/:id', Product.update);
// router.delete('/:id', Product.delete);

router.get('/*', (req, res, next) => {
  res.status(404).send({
    code: 404,
    error: 'NOT FOUND',
    message: `Endpoint ${req.url} not found.`
  });
});

module.exports = router;