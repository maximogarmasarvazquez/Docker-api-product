// src/controllers/product.controller.js
import * as ProductService from '../services/product.service.js';
import url from 'url';

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    if (products.length === 0) {
    res.writeHead(204); // No hay contenido
    return res.end();
    }
    res.writeHead(200, // Solicitud exitosa. 
      { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.error('Error al obtener productos:', error);
    
    res.writeHead(500, // Error interno del servidor.
       { 'Content-Type': 'application/json' });
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
      res.writeHead(201, //201 creado con exito
         { 'Content-Type': 'application/json' });
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

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' }); //404 Not Found: El recurso solicitado no se encontró.
      return res.end(JSON.stringify({ error: 'Producto no encontrado' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Producto con id ${product.id} eliminado` }));
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error al eliminar producto' }));
  }
};


export const getProductsById = async (req, res) => {
  try {
   const product = await ProductService.getProductById(req.params.id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Producto no encontrado' }));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(product));
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error al obtener productos' }));
  }
};

export const updateProduct = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathParts = parsedUrl.pathname.split('/');
  const id = pathParts[2];

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const product = JSON.parse(body);
      const update = await ProductService.updateProduct(id, product);

      if (!update) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Producto no encontrado' }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(update));
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Error al actualizar producto' }));
    }
  });
};

// PATCH /products/:id
export const updatePartialProduct = (req, res) => {
  const id = req.params.id;

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const product = JSON.parse(body);

      // Validar que al menos haya una clave
      if (Object.keys(product).length === 0) {
        res.writeHead(400, // 400 Bad Request: La solicitud no se pudo entender debido a sintaxis incorrecta.
           { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'No se enviaron campos para actualizar' }));
      }

      const updatedProduct = await ProductService.updatePartialProduct(id, product);

      if (!updatedProduct) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Producto no encontrado' }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedProduct));
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Error al actualizar producto' }));
    }
  });
};
