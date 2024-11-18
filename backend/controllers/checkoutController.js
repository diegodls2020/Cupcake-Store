// controllers/checkoutController.js
const db = require('../config/db');

exports.createOrder = async (req, res) => {
  const { cartItems, totalAmount, userName, userAddress } = req.body;

  if (!cartItems || !totalAmount || !userName || !userAddress) {
    return res.status(400).json({ message: "Faltan datos en la solicitud." });
  }

  try {
    // Crear la compra en la base de datos
    const queryCompra = `
      INSERT INTO compras (nombre_cliente, direccion_envio, total, fecha)
      VALUES (?, ?, ?, NOW())`;
    db.query(queryCompra, [userName, userAddress, totalAmount], (err, result) => {
      if (err) {
        console.error('Error al crear la compra:', err);
        return res.status(500).json({ message: "Hubo un error al procesar la compra." });
      }

      const compraId = result.insertId;

      // Guardar los detalles de la compra (productos y cantidades)
      const queryDetalles = `
        INSERT INTO detalles_compras (compra_id, producto_id, cantidad, precio)
        VALUES (?, ?, ?, ?)`;

      // Para cada producto en el carrito
      cartItems.forEach((item) => {
        const { id, quantity } = item;

        // Consultar si el producto existe
        const queryProducto = 'SELECT * FROM productos WHERE id = ?';
        db.query(queryProducto, [id], (err, rows) => {
          if (err) {
            console.error('Error al consultar producto:', err);
            return;
          }

          if (rows.length > 0) {
            const producto = rows[0];
            const precio = producto.precio;

            // Insertar en detalles_compras
            db.query(queryDetalles, [compraId, id, quantity, precio], (err) => {
              if (err) {
                console.error('Error al agregar detalle de compra:', err);
                return;
              }
            });
          } else {
            console.error(`Producto con ID ${id} no encontrado.`);
          }
        });
      });

      // Responder con mensaje de éxito
      res.status(200).json({
        message: "Pago realizado con éxito. Sus Cupcakes serán entregados en 2 horas.",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al procesar la compra." });
  }
};
