import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Usamos useNavigate para redirigir
import "../App.css";

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
      setPaymentMessage("Por favor, insira seu nome e endereço de entrega.");
      return;
    }

    try {
      console.log("Datos enviados:", {
        cartItems: cart,
        totalAmount: getTotal(),
        userName,
        userAddress: address,
      }); // Verifica los datos enviados

      const response = await axios.post("http://localhost:5000/api/checkout", {
        cartItems: cart,
        totalAmount: getTotal(),
        userName,
        userAddress: address,
      });

      setPaymentMessage(response.data.message);
      checkout(cart);
      setUserName("");
      setAddress("");
      if (response.data.redirectTo) {
        navigate(response.data.redirectTo);
      }
    } catch (error) {
      console.error(error);
      setPaymentMessage(
        "Ocorreu um erro ao processar a compra. Por favor, tente novamente. "
      );
    }

    try {
      // Realizar el pago y guardar la compra en el backend
      const response = await axios.post("http://localhost:5000/api/orders", {
        cartItems: cart,
        totalAmount: getTotal(),
        userName,
        userAddress: address,
      });

      setPaymentMessage(response.data.message); // Mensaje de éxito desde el backend

      // Limpiar el carrito si la compra es exitosa
      checkout(cart);

      // Limpiar los campos después de la compra
      setUserName("");
      setAddress("");

      // Redirigir al home si el pago fue exitoso
      // Redirigir al inicio y enviar el mensaje como estado
      navigate("/", { state: { paymentMessage: response.data.message } });
    } catch (error) {
      console.error(error);
      setPaymentMessage(
        "Ocorreu um erro ao processar a compra. Por favor, tente novamente."
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
                  src={`http://localhost:5000/images/${item.image}`}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Preço: R$ {price.toFixed(2)}</p>
                  <p>Quantidade: {quantity}</p>
                  <p>
                    <strong>Total: R$ {totalItem.toFixed(2)}</strong>
                  </p>
                </div>
              </div>
            );
          })}
          <h3 className="cart-total">Total: R$ {getTotal().toFixed(2)}</h3>
          <div className="cart-checkout">
            {/* Campo para el nombre del usuario */}
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Nome do cliente"
              className="input-name"
              required
            />
            {/* Campo para la dirección de envío */}
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Endereço"
              className="input-address"
              required
            />
            <button onClick={handleCheckout} className="checkout-btn">
              Pagamento
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
