const express = require('express');
const { register, login } = require('../controllers/authController'); // Importa correctamente el controlador
const authMiddleware = require('../middlewares/authMIddleware'); // Asegúrate de que el nombre sea correcto

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta protegida (por ejemplo, para obtener información del usuario)
router.get('/profile', authMiddleware, (req, res) => {
    res.json({
        message: 'Perfil de usuario',
        userId: req.userId
    });
});

module.exports = router;
