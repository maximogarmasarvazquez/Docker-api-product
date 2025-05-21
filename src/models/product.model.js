// import db from '../config/bd.js';

// export const getAllProducts = async () => {
//   const [rows] = await db.query('SELECT * FROM product');
//   return rows;
// };

// export const createProduct = async (product) => {
//   const { name, description, price, stock } = product;
//   const now = new Date();

//   const [result] = await db.query(
//     `INSERT INTO product (name, description, price, stock, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`,
//     [name, description, price, stock, now, now]
//   );

//   return { id: result.insertId, name, description, price, stock };
// };

// export const getProductById = async (id) => {
//   const [rows] = await db.query('SELECT * FROM product WHERE id = ?', [id]);

//   if (rows.length === 0) {
//     throw new Error('Producto no encontrado');
//   }

//   return rows[0];
// };

// export const deletedProduct = async (id) => {
//   const [result] = await db.query('DELETE FROM product WHERE id = ?', [id]);

//   if (result.affectedRows === 0) {
//     throw new Error('Producto no encontrado');
//   }
// };

// export const updateProduct = async (id, product) => {
//   const { name, description, price, stock } = product;
//   const now = new Date();

//   const [result] = await db.query(
//     `UPDATE product SET name = ?, description = ?, price = ?, stock = ?, updatedAt = ? WHERE id = ?`,
//     [name, description, price, stock, now, id]
//   );

//   if (result.affectedRows === 0) {
//     throw new Error('Producto no encontrado');
//   }

//   return { id, name, description, price, stock };
// };

// export const updatePartialProduct = async (id, product) => {
//   const fields = [];
//   const values = [];

//   for (const [key, value] of Object.entries(product)) {
//     fields.push(`${key} = ?`);
//     values.push(value);
//   }

//   if (fields.length === 0) {
//     throw new Error('No se proporcionaron campos para actualizar');
//   }

//   fields.push('updatedAt = ?');
//   values.push(new Date());

//   values.push(id);

//   const query = `UPDATE product SET ${fields.join(', ')} WHERE id = ?`;

//   const [result] = await db.query(query, values);

//   if (result.affectedRows === 0) {
//     throw new Error('Producto no encontrado');
//   }

//   return { id, ...product };
// };

import products from '../data/products.js';

// Variable para llevar el control del último ID
let lastId = products.length ? Math.max(...products.map(p => p.id)) : 0;

export const getAllProductsModel = async () => {
  return products;
};

export const getProductByIdModel = async (id) => {
  const product = products.find(p => p.id == id);
  if (!product) throw new Error('Producto no encontrado');
  return product;
};

export const createProductModel = async (product) => {
  const now = new Date();
  const newProduct = {
    id: ++lastId,
    ...product,
    createdAt: now,
    updatedAt: now,
  };
  products.push(newProduct);
  return newProduct;
};

export const deletedProductModel = async (id) => {
  const index = products.findIndex(p => p.id == id);
  if (index === -1) throw new Error('Producto no encontrado');
  products.splice(index, 1);
};

export const updateProductModel = async (id, updatedProduct) => {
  const index = products.findIndex(p => p.id == id);
  if (index === -1) throw new Error('Producto no encontrado');

  const now = new Date();

  // Mantenemos el id original y evitamos que lo sobrescriban
  const oldProduct = products[index];
  products[index] = {
    ...updatedProduct,
    id: oldProduct.id,
    createdAt: oldProduct.createdAt,
    updatedAt: now
  };

  return products[index];
};

export const updatePartialProductModel = async (id, productData) => {
  const index = products.findIndex(p => p.id == id);
  if (index === -1) throw new Error('Producto no encontrado');

  const oldProduct = products[index];

  // Ignoramos el id si viene en los datos y lo preservamos
  const { id: ignoredId, ...dataWithoutId } = productData;

  products[index] = {
    ...oldProduct,
    ...dataWithoutId,
    updatedAt: new Date()
  };

  return products[index];
};


