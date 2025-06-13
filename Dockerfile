# Imagen base Node.js v18 con soporte ES modules
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo package.json y package-lock.json para cachear dependencias
COPY package*.json ./

# Instalar dependencias con npm
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Exponer el puerto que usa tu app (3000)
EXPOSE 3000

# Comando por defecto para arrancar la app
CMD ["npm", "run", "dev"]
