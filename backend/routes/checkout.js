// app.js
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const checkoutRoutes = require("./routes/checkout");

app.use(cors());
app.use(bodyParser.json()); // Para manejar solicitudes JSON

// Usa las rutas de checkout
app.use("/api", checkoutRoutes);

// Ruta para procesar la compra
router.post("/checkout", createOrder);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
