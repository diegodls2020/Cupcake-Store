import React from "react";
import ProductCard from "./ProductCard";
import { useCart } from "../context/CartContext"; // Usamos el hook del CartContext
import "../App.css";

const ProductList = ({ products }) => {
  const { cart, addToCart, updateQuantity } = useCart();

  const handleQuantityChange = (productId, amount) => {
    const productInCart = cart.find((item) => item.id === productId);
    if (productInCart) {
      const newQuantity = Math.max(productInCart.quantity + amount, 0);
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => {
        const productInCart = cart.find((item) => item.id === product.id) || {
          quantity: 0,
        };
        return (
          <ProductCard
            key={product.id}
            product={product}
            quantity={productInCart.quantity}
            onAddToCart={() => addToCart(product)} // Pasa el producto completo
            onQuantityChange={handleQuantityChange}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
