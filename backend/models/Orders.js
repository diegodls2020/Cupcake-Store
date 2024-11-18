const db = require("../config/db"); // Conexión a la base de datos

// Crear una nueva compra
const createOrder = async (nombre_cliente, direccion_envio, total) => {
  const [result] = await db.execute(
    "INSERT INTO compras (nombre_cliente, direccion_envio, total, fecha) VALUES (?, ?, ?, NOW())",
    [nombre_cliente, direccion_envio, total]
  );
  return result.insertId; // Retorna el ID de la compra creada
};

// Agregar un detalle de compra
const addOrderDetail = async (compra_id, producto_id, cantidad, precio) => {
  await db.execute(
    "INSERT INTO detalle_compras (compra_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)",
    [compra_id, producto_id, cantidad, precio]
  );
};

// Obtener el producto por su ID
const getProductById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM productos WHERE id = ?", [id]);
  return rows[0]; // Devuelve el producto encontrado
};

module.exports = { createOrder, addOrderDetail, getProductById };
