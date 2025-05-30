// src/controllers/product.controller.js
import * as ProductService from '../services/product.service.js';
import url from 'url';

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.error('Error al obtener productos:', error);
    
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error al obtener productos' }));
  }
};

export const createProduct = async (req, res) => {
  try {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const product = JSON.parse(body); // parseamos el JSON recibido
      const newProduct = await ProductService.createProduct(product);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newProduct));
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error al crear producto' }));
  }
};

export const deletedProduct = async (req, res) => {
  try {
   const product = await ProductService.deletedProduct(req.params.id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(product));
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error al eliminar productos' }));
  }
};

export const getProductsById = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.id);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(product));
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error al obtener productos' }));
  }
};


export const updateProduct = async (req, res) => {
  try {
    // Parsear URL para obtener el id
    const parsedUrl = url.parse(req.url, true);
    const pathParts = parsedUrl.pathname.split('/'); // ej: ['', 'products', '123']
    const id = pathParts[2]; // El id está en la posición 2

    // Leer el body con stream
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const product = JSON.parse(body); // parsear el JSON del body

      // Llamar al servicio con id y producto
      const update = await ProductService.updateProduct(id, product);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(update));
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error al actualizar producto' }));
  }
};

export const updatePartialProduct = (req, res) => {
  const id = req.params.id;

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const product = JSON.parse(body);
      const update = await ProductService.updatePartialProduct(id, product);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(update));
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Error al actualizar producto' }));
    }
  });
};