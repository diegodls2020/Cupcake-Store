const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");

// Ruta para procesar la compra
router.post("/checkout", checkoutController.createOrder);

module.exports = router;
