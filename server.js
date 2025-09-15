const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Definir la ruta al build de Angular
const distFolder = path.join(__dirname, 'dist/rehobot_front/browser');

// Servir archivos estáticos
app.use(express.static(distFolder));

// Redirigir todas las rutas al index.html
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distFolder, 'index.csr.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Frontend corriendo en http://localhost:${port}`);
});
