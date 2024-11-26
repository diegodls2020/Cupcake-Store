import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ ...product, quantity });
    }
  };

  return (
    <div className="product-card">
      <img
        src={`http://localhost:5000/images/${product.image}`}
        alt={product.name}
        className="product-image"
      />
      <h2>{product.name}</h2>
      <p>R$ {product.price}</p>

      <div className="quantity-controls">
        <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
      </div>

      <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default ProductCard;
