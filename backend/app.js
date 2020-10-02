import express  from 'express';
import dotenv   from 'dotenv';
import colors   from 'colors';
import connectDB from './config/db.js';
import products from './data/products.js';

dotenv.config();

const app = express();

// connect DB
connectDB();

// middlewares
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 4000;

// define routes
app.get('/api/products', (req, res) => {
    res.json(products)
});

app.get('/api/products/:id', (req, res) => {

    const product = products.find(p => p._id === req.params.id);

    res.json(product)
});

app.listen(PORT, () => { console.log(`${process.env.NODE_ENV} server started on port ${PORT}`.underline.bold.blue); });