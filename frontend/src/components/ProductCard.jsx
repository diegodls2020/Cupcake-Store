import React, { useState } from "react";

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity }); // Pasa el producto y la cantidad seleccionada
  };

  return (
    <div className="product-card">
      <img
        src={`http://localhost:5000/images/${product.image}`}
        alt={product.name}
        className="product-image"
      />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">${product.price}</p>

      {/* Controles de cantidad */}
      <div className="quantity-controls">
        <button onClick={() => setQuantity(quantity - 1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>

      {/* Botón de agregar al carrito */}
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
