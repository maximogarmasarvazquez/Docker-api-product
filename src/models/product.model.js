import db from '../config/bd.js';

export const getAllProductsModel = async () => {
  const [rows] = await db.query('SELECT * FROM product');
  // rows es un array de objetos, cada objeto representa una fila de la tabla 
  return rows;
};

export const createProductModel = async (product) => {
  const { name, description, price, stock } = product;
  const now = new Date();

  const [result] = await db.query(
    `INSERT INTO product (name, description, price, stock, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, price, stock, now, now]
  );

  return { id: result.insertId, name, description, price, stock };
};

export const getProductByIdModel = async (id) => {
  const [rows] = await db.query('SELECT * FROM product WHERE id = ?', [id]);

  if (rows.length === 0) {
    throw new Error('Producto no encontrado');
  }

  return rows[0];
};

export const deletedProductModel = async (id) => {
  const [result] = await db.query('DELETE FROM product WHERE id = ?', [id]);

  if (result.affectedRows === 0) {
    throw new Error('Producto no encontrado');
  }
};

export const updateProductModel = async (id, product) => {
  const { name, description, price, stock } = product;
  const now = new Date();

  const [result] = await db.query(
    `UPDATE product SET name = ?, description = ?, price = ?, stock = ?, updatedAt = ? WHERE id = ?`,
    [name, description, price, stock, now, id]
  );

  if (result.affectedRows === 0) {
    throw new Error('Producto no encontrado');
  }

  return { id, name, description, price, stock };
};

export const updatePartialProductModel = async (id, product) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(product)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  if (fields.length === 0) {
    throw new Error('No se proporcionaron campos para actualizar');
  }

  fields.push('updatedAt = ?');
  values.push(new Date());

  values.push(id);

  const query = `UPDATE product SET ${fields.join(', ')} WHERE id = ?`;

  const [result] = await db.query(query, values);

  if (result.affectedRows === 0) {
    throw new Error('Producto no encontrado');
  }

  return { id, ...product };
};
