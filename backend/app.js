import express  from 'express';
import dotenv   from 'dotenv';
import colors   from 'colors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// connect DB
connectDB();


// middlewares
app.use(express.json({ extended: false }));


// define routes
app.use('/api/products', productRoutes);
app.use('/api/auth', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => { console.log(`${process.env.NODE_ENV} server started on port ${PORT}`.underline.bold.blue); });