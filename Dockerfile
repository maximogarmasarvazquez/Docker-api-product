# Imagen base de Node.js con soporte para ES modules
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar solo package.json y lock para cache de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto (solo para info, no obligatorio)
EXPOSE 3000

# Comando por defecto para producción
CMD ["node", "server.js"]
