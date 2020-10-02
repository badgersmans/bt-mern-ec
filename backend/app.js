const express   = require('express');
const colors    = require('colors');
const products  = require('./data/products');

const app = express();

const PORT = process.env.PORT || 4000;

// define routes
app.get('/api/products', (req, res) => {
    res.json(products)
});

app.get('/api/products/:id', (req, res) => {

    const product = products.find(p => p._id === req.params.id);

    res.json(product)
});

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`.underline.bold.blue); });