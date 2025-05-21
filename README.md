# API de Productos

API REST simple para gestión de productos, desarrollada en Node.js con Express.  
Los datos están hardcodeados en memoria (todo para usar la bd esta comentado).

---

## Contenido

- [Descripción](#descripción)
- [Node](#tecnologías)
- [npm install](#instalación)
- [Rutas](#rutas)

---

## Descripción

Esta API permite realizar operaciones CRUD sobre un conjunto de productos definidos en memoria.  

---

## Tecnologías

- Node.js
- Express
- JavaScript (ES Modules)

---

## Instalación

Clonar el repositorio  

git clone <url-del-repositorio>

Instalar dependencias

npm install

Ejecutar la API en modo desarrollo

npm run dev

La API correrá en http://localhost:3000 por defecto.

 ## Rutas
Usa herramientas como Postman o thunder para consumir las rutas HTTP.

📡Rutas disponibles

Usa herramientas como Postman o Thunder Client para probar las rutas HTTP.


| Método | Ruta                   | Descripción                         |
| ------ | ---------------------- | ----------------------------------- |
| GET    | `/api/v1/products`     | Obtener todos los productos         |
| GET    | `/api/v1/products/:id` | Obtener un producto por ID          |
| POST   | `/api/v1/products`     | Crear un nuevo producto             |
| PUT    | `/api/v1/products/:id` | Actualizar un producto completo     |
| PATCH  | `/api/v1/products/:id` | Actualizar un producto parcialmente |
|        |                        |                                     |


## Ejemplo de Producto

```json
{
  "id": 1,
  "name": "Producto ejemplo",
  "description": "Descripción del producto",
  "price": "100.00",
  "stock": 50,
  "createdAt": "2025-05-21T00:00:00.000Z",
  "updatedAt": "2025-05-21T00:00:00.000Z"
}