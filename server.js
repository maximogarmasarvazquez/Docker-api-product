// require('dotenv').config(); // 🔹 Primero cargamos las variables de entorno

import app from './src/app.js';

const PORT = process.env.PORT || 3000; // 🔹 Ahora PORT sí puede leerse correctamente

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
