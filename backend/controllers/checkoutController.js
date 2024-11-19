const db = require('../config/db');

exports.createOrder = async (req, res) => {
  const { cartItems, totalAmount, userName, userAddress } = req.body;

  if (!cartItems || !totalAmount || !userName || !userAddress) {
    return res.status(400).json({ message: "Faltan datos en la solicitud." });
  }

  const connection = await db.getConnection();  // Obtener conexión para manejar transacciones
  try {
    await connection.beginTransaction(); // Iniciar la transacción

    // Crear la compra en la base de datos
    const queryCompra = `
      INSERT INTO compras (nombre_cliente, direccion_envio, total, fecha)
      VALUES (?, ?, ?, NOW())`;
    const [resultCompra] = await connection.query(queryCompra, [userName, userAddress, totalAmount]);
    const compraId = resultCompra.insertId;

    // Guardar los detalles de la compra (productos y cantidades)
    const queryDetalles = `
      INSERT INTO detalles_compras (compra_id, producto_id, cantidad, precio)
      VALUES (?, ?, ?, ?)`;

    for (let item of cartItems) {
      const { id, quantity } = item;

      // Consultar si el producto existe
      const queryProducto = 'SELECT * FROM productos WHERE id = ?';
      const [rows] = await connection.query(queryProducto, [id]);

      if (rows.length > 0) {
        const producto = rows[0];
        const precio = producto.precio;

        // Insertar en detalles_compras
        await connection.query(queryDetalles, [compraId, id, quantity, precio]);
      } else {
        await connection.rollback();  // Revertir transacción si el producto no existe
        return res.status(400).json({ message: `Producto con ID ${id} no encontrado` });
      }
    }

    // Confirmar la transacción
    await connection.commit();

    // Responder con mensaje de éxito
    res.status(200).json({
      message: "Pago realizado con éxito. Sus Cupcakes serán entregados en 2 horas.",
    });
  } catch (error) {
    console.error("Error al procesar la orden:", error);
    await connection.rollback();  // Revertir en caso de error
    res.status(500).json({ message: "Error al procesar la orden." });
  } finally {
    connection.release();  // Liberar la conexión
  }
};
