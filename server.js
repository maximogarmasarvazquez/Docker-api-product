import dotenv from 'dotenv';
dotenv.config();  // Se ejecuta antes de usar process.env

import app from './src/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});