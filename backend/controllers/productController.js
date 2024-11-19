const Producto = require("../models/Producto");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Producto.getAll(); // Consulta al modelo
    if (products.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos." });
    }
    res.status(200).json(products); // Respuesta exitosa
  } catch (err) {
    console.error("Error al obtener productos:", err.message);
    res.status(500).json({
      error: "Error interno del servidor al obtener los productos.",
    });
  }






};
