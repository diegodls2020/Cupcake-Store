// Importa solo lo necesario
const { getProductById } = require("../models/Producto"); // De Producto
const { createOrder, addOrderDetail } = require("../models/Orders"); // De Orders

// Crear una nueva orden
exports.createOrder = async (req, res) => {
  const { cartItems, totalAmount, userName, userAddress } = req.body;
  console.log("Datos recibidos en el backend:", {
    cartItems,
    totalAmount,
    userName,
    userAddress,
  }); // Log para verificar

  try {
    // Crear la orden en la base de datos
    const orderId = await createOrder(userName, userAddress, totalAmount);

    // Procesar los detalles de la compra
    for (let item of cartItems) {
      const producto = await getProductById(item.id); // Obtener el producto por ID

      if (producto) {
        // Agregar el detalle de la orden
        await addOrderDetail(
          orderId,
          producto.id,
          item.quantity,
          producto.price
        );
      } else {
        // Si no se encuentra el producto
        return res
          .status(400)
          .json({ message: `Producto con ID ${item.id} no encontrado` });
      }
    }

    // Responder con éxito
    res.status(200).json({
      message:
        "Pago realizado con éxito, sus Cupcakes serán entregados en 2 horas.",
      clearCart: true,
      redirectTo: "/",
    });
  } catch (error) {
    console.error("Error al procesar la orden:", error);
    res.status(500).json({ message: "Error al procesar la orden." });
  }
};

// Obtener todas las órdenes
exports.getOrders = async (req, res) => {
  try {
    const [orders] = await db.execute("SELECT * FROM compras");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    res.status(500).json({ message: "Error al obtener las órdenes." });
  }
};
