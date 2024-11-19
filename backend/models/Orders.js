const db = require("../config/db"); // Conexión a la base de datos

// Crear una nueva compra
const createOrder = async (nombre_cliente, direccion_envio, total) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO compras (nombre_cliente, direccion_envio, total, fecha) VALUES (?, ?, ?, NOW())",
      [nombre_cliente, direccion_envio, total]
    );
    console.log("ID de la orden creada:", result.insertId); // Verifica el ID
    return result.insertId;
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw error;
  }
};

// Agregar un detalle de compra
const addOrderDetail = async (compra_id, producto_id, cantidad, precio) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO detalle_compras (compra_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)",
      [compra_id, producto_id, cantidad, precio]
    );
    console.log("Detalle agregado:", result); // Verifica el detalle agregado
  } catch (error) {
    console.error("Error al agregar el detalle:", error);
    throw error;
  }
};
module.exports = { createOrder, addOrderDetail };
