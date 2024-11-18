const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/OrderController");

// Ruta para procesar la compra
router.post("/checkout", createOrder);

module.exports = router;
