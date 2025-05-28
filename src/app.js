import express from 'express';
const app = express();

import productRoutes from './routes/product.route.js';
import initDB from './config/init.js'; // Import the initDB function

initDB();

app.use(express.json());
app.use('/api/v1', productRoutes);

export default app;
