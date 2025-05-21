// src/controllers/product.controller.js
import * as ProductService from '../services/product.service.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = await ProductService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

export const deletedProduct = async (req, res) => {
  try {
    await ProductService.deletedProduct(req.params.id);
    res.status(204).json({ message: `Producto ${req.params.id} eliminado con éxito` });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(error.message === 'Producto no encontrado' ? 404 : 500).json({ error: error.message });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const products = await ProductService.getProductById(req.params.id);
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
    return res.status(204).json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(error.message === 'Producto no encontrado' ? 404 : 500).json({ error: error.message });
  }
};

export const updatePartialProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductService.updatePartialProduct(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(error.message === 'Producto no encontrado' ? 404 : 500).json({ error: error.message });
  }
};