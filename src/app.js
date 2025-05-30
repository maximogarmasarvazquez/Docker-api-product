
import productRoutes from './routes/product.route.js';
import initDB from './config/init.js'; // Import the initDB function
import http from 'http';
import url from 'url';

 initDB(); // Inicializamos la base de datos

const app = http.createServer((req, res) => { //creamos el servidor HTTP manualmente
  const parsedUrl = url.parse(req.url, true); // Parseamos la URL para manejar los parámetros de consulta (query y path)
  const path = parsedUrl.pathname;
  // Enrutamiento manual
  if (path.startsWith('/api/v1')) { //start with verifica si un texto comienza con /api/v1
    req.url = req.url.replace('/api/v1', '') || '/';// Quitamos el prefijo /api/v1 para que el router lo maneje bien
    productRoutes.handle(req, res); // handle (manejar) es la funcion que maneja las rutas del router
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });// escribimos el encabezado de respuesta con un código 404
    res.end(JSON.stringify({ error: 'Ruta no encontrada' })); // lo pasamos a string manualmente
  }

});


export default app;
