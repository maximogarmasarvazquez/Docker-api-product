// src/routes/product.routes.js
import express from 'express';
const router = express.Router();
import * as productController from '../controller/product.controller.js';
// GET todos los productos
router.get('/products', productController.getAllProducts);

router.post('/products', productController.createProduct);

router.delete('/products/:id', productController.deletedProduct);

router.get('/products/:id', productController.getProductsById);

router.put('/products/:id', productController.updateProduct);

router.patch('/products/:id', productController.updatePartialProduct);

export default router;