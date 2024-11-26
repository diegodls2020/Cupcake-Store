import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    };

    fetchOrders();
  }, []);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/${orderId}` // Ruta correcta
      );
      setOrderDetails(response.data);
      setSelectedOrder(orderId);
    } catch (error) {
      console.error("Error al obtener los detalles:", error);
    }
  };

  return (
    <div className="admin-page">
      <h2>Gerenciamento de pedidos</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <strong>Data da compra:</strong> {order.fecha}
            <strong>Cliente:</strong> {order.nombre_cliente}
            <strong>Endereço:</strong> {order.direccion_envio}
            <strong>Total:</strong> R${order.total}
            <button
              onClick={() => fetchOrderDetails(order.id)}
              className="order-button"
            >
              Ver Detalles
            </button>
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <div>
          <h3>Detalhes do pedido # {selectedOrder}</h3>
          <ul className="details-list">
            {orderDetails.map((detail) => (
              <li key={detail.id} className="details-item">
                Codigo do Producto: {detail.producto_id} - Quantidade: {detail.cantidad}
               
              </li>
            ))}
          </ul>
        </div>  
      )}
    </div>
  );
};

export default AdminPage;
