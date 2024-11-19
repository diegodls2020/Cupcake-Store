import React, { useState } from "react";

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="product-card">
      <img
        src={`http://localhost:5000/images/${product.image}`}
        alt={product.name}
        className="product-image"
      />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">R$ {product.price}</p>

      <div className="quantity-controls">
        <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
      </div>

      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Adicionar ao carrinho
      </button>
    </div>
  );
};

export default ProductCard;
