const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist/rehobot_front/browser')));

// Redirigir todas las rutas al index.html
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

app.listen(port, () => {
  console.log(`Frontend corriendo en http://localhost:${port}`);
});
