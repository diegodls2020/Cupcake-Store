const Producto = require("../models/Producto");

// Obtener todos los productos
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

// Agregar un nuevo producto
exports.addProduct = async (req, res) => {
  const { name, description, price, image } = req.body;

  // Validar los datos del producto
  if (!name || !description || !price || !image) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
    const newProduct = await Producto.add({ name, description, price, image }); // Llama al método del modelo
    res.status(201).json({ message: "Producto agregado exitosamente.", product: newProduct });
  } catch (err) {
    console.error("Error al agregar producto:", err.message);
    res.status(500).json({
      error: "Error interno del servidor al agregar el producto.",
    });
  }
};

