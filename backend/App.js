const express = require("express");
const cors = require("cors");
const path = require("path");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Configura CORS
app.use(cors());

// Middleware para analizar datos JSON
app.use(express.json());

// Ruta estática para imágenes
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// Rutas para productos
app.use("/api", productRoutes);
// Rutas para órdenes
app.use("/api/orders", orderRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend corriendo en el puerto ${PORT}`);
});
