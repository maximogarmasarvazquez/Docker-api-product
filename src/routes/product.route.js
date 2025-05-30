// src/routes/product.routes.js
import * as productController from '../controller/product.controller.js';

function createRouter() {
  const routes = [];

  function register(method, path, handler) {
    const paramNames = [];
    const regexPath = path
      .replace(/:([^/]+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return '([^/]+)';
      });

    const regex = new RegExp(`^${regexPath}$`);

    routes.push({ method: method.toUpperCase(), regex, handler, paramNames });
  }

  function get(path, handler) { register('GET', path, handler); }
  function post(path, handler) { register('POST', path, handler); }
  function put(path, handler) { register('PUT', path, handler); }
  function del(path, handler) { register('DELETE', path, handler); }
  function patch(path, handler) { register('PATCH', path, handler); }

  function handle(req, res) {
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

  return { get, post, put, patch, delete: del, handle };
}

const router = createRouter();


router.get('/products', productController.getAllProducts);

router.post('/products', productController.createProduct);

router.delete('/products/:id', productController.deletedProduct);

router.get('/products/:id', productController.getProductsById);

router.put('/products/:id', productController.updateProduct);

router.patch('/products/:id', productController.updatePartialProduct);

export default router;