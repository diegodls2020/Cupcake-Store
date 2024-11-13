// app.js
const express = require("express");
const cors = require("cors");
const db = require("./config/db"); // Importa la conexión a la base de datos
const path = require("path");
const app = express();

// Configura CORS para permitir solicitudes desde el frontend
app.use(cors());

// Middleware para analizar datos JSON
//app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "public", "images")));

// Endpoint para obtener productos
app.get("/api/products", (req, res) => {
  const query = "SELECT id, name, price, image FROM productos";
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener productos:", error.message);
      return res.status(500).json({ error: "Error al obtener productos" });
    }
    res.json(results);
  });
});

// Configurar el puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Backend corriendo en el puerto ${PORT}`);
});
