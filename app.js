// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
require('dotenv').config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
