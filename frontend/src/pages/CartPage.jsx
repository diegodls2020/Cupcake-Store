import React from "react";
import { useCart } from "../context/CartContext"; // Importar el contexto si lo estás usando

const CartPage = ({ cart, checkout }) => {
  const getTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return total + price * quantity;
    }, 0);
  };

  return (
    <div>
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
            <button onClick={() => checkout(cart)} className="checkout-btn">
              Realizar Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
