import express from 'express';
const app = express();

import productRoutes from './routes/product.route.js';
// const initDB = require('./config/init.js');
// initDB();

app.use(express.json());
app.use('/api/v1', productRoutes);

export default app;
