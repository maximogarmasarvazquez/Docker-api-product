# Imagen base de Node.js con soporte para ES modules
FROM node:18

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install 

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que usa tu aplicación (opcional)
EXPOSE 3000

# Comando por defecto para correr la app
CMD ["node", "server.js"]
