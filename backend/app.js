import express  from 'express';
import dotenv   from 'dotenv';
import colors   from 'colors';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

// connect DB
connectDB();


// middlewares
app.use(express.json({ extended: false }));


// define routes
 app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => { console.log(`${process.env.NODE_ENV} server started on port ${PORT}`.underline.bold.blue); });