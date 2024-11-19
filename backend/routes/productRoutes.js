// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Ruta para obtener todos los productos
router.get("/", productController.getAllProducts);  
module.exports = router;
