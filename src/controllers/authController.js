// src/controllers/authController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    console.log('Request Body:', req.body); // Verifica que el cuerpo de la solicitud sea correcto
    const { username, password, email } = req.body;

    // Verificar si el usuario ya existe
    User.findByUsername(username, (err, results) => {
        if (err) {
            console.error('Error al buscar el usuario:', err); // Loguea el error
            return res.status(500).send('Error en el servidor');
        }
        if (results.length > 0) return res.status(400).send('El usuario ya existe');

        // Hash de la contraseña
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error al hashear la contraseña:', err); // Loguea el error
                return res.status(500).send('Error en el servidor');
            }

            // Crear el nuevo usuario
            User.create(username, hashedPassword, email, (err, results) => {
                if (err) {
                    console.error('Error al registrar el usuario:', err); // Loguea el error
                    return res.status(500).send('Error al registrar el usuario');
                }
                res.status(201).send('Usuario registrado con éxito');
            });
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Buscar usuario en la base de datos
    User.findByUsername(username, (err, results) => {
        if (err) return res.status(500).send('Error en el servidor');
        if (results.length === 0) return res.status(400).send('Usuario no encontrado');

        const user = results[0];

        // Comparar la contraseña
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send('Error en el servidor');
            if (!isMatch) return res.status(401).send('Contraseña incorrecta');

            // Generar el token JWT
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({
                message: 'Inicio de sesión exitoso',
                token: token
            });
        });
    });
};
