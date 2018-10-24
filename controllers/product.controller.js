const Product = require('../models/product.model');

exports.test = (req, res) => {
    res.send('Greetings from the Test controller!');
};

exports.product_create = (req, res) => {
    try {
        console.log(req.body);

        if (!req.body.name)
            throw ('name parameter not found')

        if (!req.body.price)
            throw ('price parameter not found')

        let product = new Product({
            name: req.body.name,
            price: req.body.price
        });

        product.save(function (err) {
            if (err) {
                throw (err);
            }
            res.send({
                code: 200,
                message: `product [${req.body.name}] created successfully.`
            })
        })
    } catch (e) {
        res.status(400).send({
            code: 400,
            error: 'Bad request',
            message: e
        })
    }
};

exports.product_list = (req, res) => {
    try {
        Product.find((err, product) => {
            if (err)
                throw ('error listing products')

            res.send(product);
        })
    } catch (e) {
        res.status(400).send({
            code: 400,
            error: 'Bad request',
            message: e
        })
    }
}

exports.product_details = function (req, res) {
    try {
        if (!req.params.id)
            throw ('invalid parameter id')

        Product.findById(req.params.id, function (err, product) {
            if (err)
                throw ('error reading product')

            res.send(product);
        })

    } catch (e) {
        res.status(400).send({
            code: 400,
            error: 'Bad request',
            message: e
        })
    }
};