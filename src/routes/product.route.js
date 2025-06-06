// src/routes/product.routes.js
import * as productController from '../controller/product.controller.js';

function createRouter() {
  const routes = []; // ⬅️ array para almacenar las rutas registradas

  function register(method, path, handler) {
    const paramNames = [];
    const regexPath = path
      .replace(/:([^/]+)/g, (_, paramName) => { // ([^/]+) captura una secuencia de texto sin / despues de :
        paramNames.push(paramName);            // Captura el nombre del parámetro y lo agrega a paramNames
        return '([^/]+)';
      });

    const regex = new RegExp(`^${regexPath}$`); // Crea una expresión regular a partir de la ruta
                                               // ^ indica el inicio de la cadena, $ indica el final de la cadena
    routes.push({ method: method.toUpperCase(), regex, handler, paramNames }); // ⬅️ guardamos el método, la regex, el handler y los nombres de los parámetros
  }

  function get(path, handler) { register('GET', path, handler); }// aca registramos las rutas para compararlas 
  function post(path, handler) { register('POST', path, handler); }
  function put(path, handler) { register('PUT', path, handler); }
  function del(path, handler) { register('DELETE', path, handler); }
  function patch(path, handler) { register('PATCH', path, handler); }

  function handle(req, res) { //compara lo ingresado en el req con las rutas registradas
    const { method, url } = req;
    const reqUrl = new URL(url, `http://${req.headers.host}`);
    const pathname = reqUrl.pathname;

    for (const route of routes) {
      if (route.method !== method.toUpperCase()) continue;
      const match = pathname.match(route.regex);
      if (match) {
        const params = {};
        route.paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });
        req.params = params; // ⬅️ guardamos los params en el request
        return route.handler(req, res);
      }
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }

  return { get, post, put, patch, delete: del, handle }; //devolvemos las funciones q usara el router
}

const router = createRouter();// Se ejecuta createRouter una vez y se guarda en la constante router que seria un objeto

//llamamos a las funciones del router y le pasamos las rutas y la funcion handler, con estas rutas va a comparar
//lo que ingrese el usuario en el req.url
router.get('/products', productController.getAllProducts); 

router.post('/products', productController.createProduct);

router.delete('/products/:id', productController.deletedProduct);

router.get('/products/:id', productController.getProductsById);

router.put('/products/:id', productController.updateProduct);

router.patch('/products/:id', productController.updatePartialProduct);

export default router;