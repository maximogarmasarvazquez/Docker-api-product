import pool from './bd.js';
const initDB = async () => {
  try {
    await pool.query(`
  CREATE TABLE IF NOT EXISTS product (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) COLLATE utf8_spanish_ci DEFAULT NULL,
    description VARCHAR(255) COLLATE utf8_spanish_ci DEFAULT NULL,
    price DECIMAL(10,2) DEFAULT NULL,
    stock INT(11) DEFAULT NULL,
    deletedAt TINYINT(1) DEFAULT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  )
    `);  
    console.log('Tabla product verificada/creada.');
  } catch (error) {
    console.error('Error al crear/verificar la tabla product:', error);
  }
};


export default initDB;