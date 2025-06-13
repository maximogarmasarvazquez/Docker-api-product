import pool from './bd.js';

const initDB = async () => {
  let retries = 5;
  while (retries) {
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
      return;
    } catch (error) {
      console.error(`⏳ Error conectando a la base de datos: ${error.code}. Reintentando...`);
      retries--;
      await new Promise(res => setTimeout(res, 3000)); // Espera 3 segundos
    }
  }

  throw new Error('❌ No se pudo conectar a la base de datos después de varios intentos.');
};

export default initDB;