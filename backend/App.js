const express = require("express");
const cors = require("cors");
const path = require("path");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();

// Middleware CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Cambia por la URL correcta de tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Asegúrate de permitir POST
  })
);

// Middleware para analizar datos JSON
app.use(express.json());

// Ruta estática para imágenes
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// Rutas principales
app.use("/api/products", productRoutes); // Rutas relacionadas con productos
app.use("/api/orders", orderRoutes); // Rutas relacionadas con órdenes
app.use("/api/products/add", productRoutes); // Rutas relacionadas con productos

// Puerto del servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend corriendo en el puerto ${PORT}`);
});
