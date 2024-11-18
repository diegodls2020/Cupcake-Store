const Producto = require("../models/Producto");

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Producto.getAll();
    res.json(products);
  } catch (err) {
    console.error("Error al obtener productos:", err.message);
    res.status(500).send("Error al obtener los productos.");
  }
};

// Agregar un nuevo producto
exports.addProduct = async (req, res) => {
  const { nombre, descripcion, precio, imagen } = req.body;
  try {
    const query =
      "INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)";
    const [result] = await db
      .promise()
      .query(query, [nombre, descripcion, precio, imagen]);
    res.status(201).json({
      message: "Producto agregado exitosamente",
      productId: result.insertId,
    });
  } catch (err) {
    console.error("Error al agregar el producto:", err.message);
    res.status(500).send("Error al agregar el producto.");
  }
};
