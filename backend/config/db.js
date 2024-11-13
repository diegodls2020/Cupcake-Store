// config/db.js
const mysql = require("mysql2");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "cupcake_store",
  port: process.env.DB_PORT || 3306,
};

// Crear la conexión con MySQL
const db = mysql.createConnection(dbConfig);

// Intentar conectar con la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err.message);
    console.error("Detalles del error:", err);
    process.exit(1); // Salir del proceso si la conexión falla
  } else {
    console.log("Conexión exitosa a la base de datos.");
  }
});

module.exports = db;
