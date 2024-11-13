import React from "react";

const Cart = ({ cart, onRemoveFromCart, onClearCart, onCheckout }) => {
  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>Precio: ${item.price.toFixed(2)}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => onRemoveFromCart(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="cart-actions">
            <button onClick={onCheckout}>Finalizar Compra</button>
            <button onClick={onClearCart}>Cancelar Compra</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
