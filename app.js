const express = require('express');
const bodyParser = require('body-parser');

const dbm = require('./db');
const product = require('./routes/product.route');
const app = express();

const db = dbm.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/products', product);

app.use((req, res, next) => {
  res.status(404).send({
    code: 404,
    error: 'NOT FOUND',
    message: `Endpoint ${req.url} not found.`
  });
});

let port = 1234;

app.listen(port, () => {
  console.log('Server is up and running on port numner ' + port);
});