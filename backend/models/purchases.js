/*const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


// Ruta para obtener las compras del usuario
router.get('/', (req, res) => {
    // Supongamos que el usuario está autenticado y su ID está en el token JWT
    const userId = req.user.id; // O la manera en que identificas al usuario en tu sistema
  
    // Consulta SQL para obtener las compras del usuario
    connection.query(
      'SELECT * FROM compras',
      [userId],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Error al obtener las compras' });
        }
        res.json(results); // Devolvemos las compras en formato JSON
      }
    );
  });
  
  module.exports = router;*/