const {
  createOrder,
  addOrderDetail,
  getOrders,
  getOrderDetails,
} = require("../models/Orders");
const { getProductById } = require("../models/Producto");
const Orders = require("../models/Orders");

// Crear una nueva orden
exports.createOrder = async (req, res) => {
  const { cartItems, totalAmount, userName, userAddress } = req.body;
  console.log("Datos recibidos en el backend:", {
    cartItems,
    totalAmount,
    userName,
    userAddress,
  });

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
          producto.price
        );
      } else {
        return res
          .status(400)
          .json({ message: `Producto con ID ${item.id} no encontrado` });
      }
    }

    res.status(200).json({
      message:
        "Pagamento realizado com sucesso, seus Cupcakes serão entregues em 2 horas.",
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
    const orders = await Orders.getOrders(); // Llama al modelo
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener las órdenes:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
// Obtener detalles de una orden
exports.getOrderDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const details = await getOrderDetails(id); // Llama al modelo
    res.status(200).json(details); // Retorna los detalles
  } catch (error) {
    console.error("Error al obtener los detalles de la orden:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.getOrderDetailsById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const details = await getOrderDetails(orderId);
    res.status(200).json(details); // Enviar detalles al cliente
  } catch (error) {
    console.error("Error al obtener los detalles:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
