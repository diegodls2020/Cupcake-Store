const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

// Ruta para obtener todos los productos
router.get("/", productController.getAllProducts);

// Ruta para agregar un nuevo producto
router.post("/add", productController.addProduct);


module.exports = router;
