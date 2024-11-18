import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Usamos useNavigate para redirigir

const CartPage = ({ cart, checkout }) => {
  const [address, setAddress] = useState("");
  const [userName, setUserName] = useState(""); // Nuevo campo para el nombre
  const [paymentMessage, setPaymentMessage] = useState("");
  const navigate = useNavigate(); // Hook para redirigir al home

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return total + price * quantity;
    }, 0);
  };

  const handleCheckout = async () => {
    if (!userName || !address) {
      setPaymentMessage("Por favor, ingresa tu nombre y dirección de envío.");
      return;
    }

    try {
      // Realizar el pago y guardar la compra en el backend
      const response = await axios.post("http://localhost:5000/api/checkout", {
        cartItems: cart,
        totalAmount: getTotal(),
        userName, // Pasar el nombre del usuario
        userAddress: address,
      });

      setPaymentMessage(response.data.message); // Mensaje de éxito desde el backend

      // Limpiar el carrito si la compra es exitosa
      checkout(cart);

      // Limpiar los campos después de la compra
      setUserName("");
      setAddress("");

      // Redirigir al home si el pago fue exitoso
      if (response.data.redirectTo) {
        navigate(response.data.redirectTo); // Redirige al home
      }
    } catch (error) {
      console.error(error);
      setPaymentMessage(
        "Hubo un error al procesar la compra. Inténtalo nuevamente."
      );
    }
  };

  return (
    <div className="cart-page">
      <h2 className="cart-page-header">Resumen de la Compra</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">
          Agrega productos a tu carrito para empezar.
        </p>
      ) : (
        <div className="cart-items-container">
          {cart.map((item, index) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            const totalItem = price * quantity;

            return (
              <div className="cart-item" key={index}>
                <img
                  src={`http://localhost:5000/images/${item.image}`} // Suponiendo que las imágenes están en una carpeta pública en el backend
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Precio: ${price.toFixed(2)}</p>
                  <p>Cantidad: {quantity}</p>
                  <p>
                    <strong>Total: ${totalItem.toFixed(2)}</strong>
                  </p>
                </div>
              </div>
            );
          })}
          <h3 className="cart-total">
            Total del Carrito: ${getTotal().toFixed(2)}
          </h3>
          <div className="cart-checkout">
            {/* Campo para el nombre del usuario */}
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Nombre del cliente"
              className="input-name"
              required
            />
            {/* Campo para la dirección de envío */}
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Dirección de envío"
              className="input-address"
              required
            />
            <button onClick={handleCheckout} className="checkout-btn">
              Realizar Pago
            </button>
            {paymentMessage && (
              <p className="payment-message">{paymentMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
