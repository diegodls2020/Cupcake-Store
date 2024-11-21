/* const mysql = require("mysql2/promise");  // Comentado para producción, solo local */

// Configuración para usar en local (cuando uses .env)
const dotenv = require("dotenv"); // Solo necesario en local

dotenv.config(); // Solo necesario en local

// Comentamos la creación de la conexión para usar las variables locales solo en desarrollo
/* const db = mysql.createPool({
  host: process.env.DB_HOST, // Dirección del servidor MySQL (en local, en Vercel se usará MYSQLHOST)
  user: process.env.DB_USER, // Usuario de la base de datos (en local, en Vercel se usará MYSQLUSER)
  password: process.env.DB_PASSWORD, // Contraseña (en local, en Vercel se usará MYSQLPASSWORD)
  database: process.env.DB_NAME, // Nombre de la base de datos (en local, en Vercel se usará MYSQLDATABASE)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}); */

// Usamos la conexión de producción con las variables de Vercel (si no estamos en local)
const mysql = require("mysql2/promise"); // Usamos la librería para MySQL en producción

const db = mysql.createPool({
  host: process.env.MYSQLHOST, // mysql-naxd.railway.internal (en Vercel)
  user: process.env.MYSQLUSER, // root (en Vercel)
  password: process.env.MYSQLPASSWORD, // Contraseña proporcionada por Vercel
  database: process.env.MYSQLDATABASE, // railway (en Vercel)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;
