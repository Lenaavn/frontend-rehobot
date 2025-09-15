# Usar Node para desarrollo
FROM node:22-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto por defecto de Angular
EXPOSE 4200

# Ejecutar Angular en modo desarrollo
CMD ["npm", "start"]
