// src/models/userModel.js
const db = require('../config/db');

class User {
    static findByUsername(username, callback) {
        /* No se hace asi porque te puede abrir la puerta a un SQL injection
            const sql = `SELECT * FROM users WHERE username = ${username}`;

            Lo que se esta usando abajo se llama un "dynamic statement"
            Creo no se me olvide
        */
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, [username], callback);
    }

    static create(username, password, email, callback) {
        const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        db.query(sql, [username, password, email], callback);
    }
}

module.exports = User;