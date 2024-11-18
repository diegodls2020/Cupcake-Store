const {
  createOrder,
  addOrderDetail,
  getProductById,
} = require("../models/Orders");

exports.createOrder = async (req, res) => {
  const { cartItems, totalAmount, userName, userAddress } = req.body;

  try {
    // Crear la orden en la base de datos
    const orderId = await createOrder(userName, userAddress, totalAmount);

    // Procesar los detalles de la compra
    for (let item of cartItems) {
      const producto = await getProductById(item.id);

      if (producto) {
        await addOrderDetail(
          orderId,
          producto.id,
          item.quantity,
          producto.precio
        );
      } else {
        return res
          .status(400)
          .json({ message: `Producto con ID ${item.id} no encontrado` });
      }
    }

    // Responder con éxito
    res.status(200).json({
      message:
        "Pago realizado con éxito. Sus Cupcakes serán entregados en 2 horas.",
    });
  } catch (error) {
    console.error("Error al procesar la orden:", error);
    res.status(500).json({ message: "Error al procesar la orden." });
  }
};
