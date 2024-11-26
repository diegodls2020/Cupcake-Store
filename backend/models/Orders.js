const db = require("../config/db");

// Crear una nueva compra
const createOrder = async (nombre_cliente, direccion_envio, total) => {
  const query = `
    INSERT INTO compras (nombre_cliente, direccion_envio, total, fecha)
    VALUES (?, ?, ?, NOW())
  `;
  const [result] = await db.execute(query, [
    nombre_cliente,
    direccion_envio,
    total,
  ]);
  return result.insertId;
};

// Agregar detalle a una orden
const addOrderDetail = async (compra_id, producto_id, cantidad, precio) => {
  const query = `
    INSERT INTO detalle_compras (compra_id, producto_id, cantidad, precio)
    VALUES (?, ?, ?, ?)
  `;
  await db.execute(query, [compra_id, producto_id, cantidad, precio]);
};

// Obtener órdenes
async function getOrders() {
  try {
    const [rows] = await db.query(
      "SELECT id, nombre_cliente, direccion_envio, total, fecha  FROM compras"
    );
    return rows;
  } catch (error) {
    console.error("Error al obtener las órdenes:", error.message);
    throw error;
  }
}

// Obtener detalles de una orden
const getOrderDetails = async (orderId) => {
  const query = `
    SELECT id, producto_id, cantidad, precio
    FROM detalle_compras
    WHERE compra_id = ?
  `;
  const [rows] = await db.query(query, [orderId]); // Pasa el parámetro
  return rows; // Retorna los detalles de la orden
};

module.exports = {
  createOrder,
  addOrderDetail,
  getOrders,
  getOrderDetails,
};
