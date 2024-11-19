const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

// Ruta para crear una nueva orden
router.post("/", orderController.createOrder);

// Ruta para obtener las órdenes
router.get("/", orderController.getOrders);

module.exports = router;
