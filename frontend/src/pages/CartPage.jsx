import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Importar correctamente el hook

import "../App.css";

const CartPage = () => {
  const { cart, clearCart } = useCart(); // Obtener `cart` y `clearCart` directamente del contexto
  const [address, setAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");
  const navigate = useNavigate();

  const getTotal = () =>
    cart.reduce(
      (total, item) =>
        total +
        (parseFloat(item.price) || 0) * (parseInt(item.quantity, 10) || 0),
      0
    );

  const handlePayment = async () => {
    if (!userName || !address) {
      setPaymentMessage("Por favor preencha todos os campos.");
      return;
    }

    const totalAmount = getTotal();
    try {
      const response = await axios.post("http://localhost:5000/api/orders", {
        cartItems: cart,
        totalAmount,
        userName,
        userAddress: address,
      });

      if (response.data.clearCart) {
        clearCart(); // Vaciar el carrito en el contexto
        setPaymentMessage(response.data.message);
        setTimeout(() => {
          navigate("/", { state: { paymentMessage: response.data.message } });
        }, 1000);
      }
    } catch (error) {
      console.error("Error en el pago: ", error);
      setPaymentMessage("Ocurrió un error al procesar la compra.");
    }
  };

  return (
    <div className="cart-page">
      <h2 className="cart-page-header">Resumo da compra</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">
          Adicione produtos ao seu carrinho para começar.
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
                  <p>Preço: $ {price.toFixed(2)}</p>
                  <p>Quantidade: {quantity}</p>
                  <p>
                    <strong>Total: $ {totalItem.toFixed(2)}</strong>
                  </p>
                </div>
              </div>
            );
          })}
          <h3 className="cart-total">Total: $ {getTotal().toFixed(2)}</h3>
          <div className="cart-checkout">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Nome do cliente"
              className="input-name"
              required
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Endereço"
              className="input-address"
              required
            />
            <button onClick={handlePayment} className="checkout-btn">
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
