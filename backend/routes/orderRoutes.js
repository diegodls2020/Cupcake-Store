const express = require("express");
const router = express.Router(); 
const {
  createOrder,
  getOrders,
  getOrderDetails,
} = require("../controllers/orderController");

// Registrar las rutas
router.post("/", createOrder); // Crear nueva orden
router.get("/", getOrders); // Obtener todas las órdenes
router.get("/:id", getOrderDetails); // Obtener detalles de una orden por ID

module.exports = router; // Exportar el router
