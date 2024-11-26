import React, { createContext, useContext, useState } from "react";

// Creamos el contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product }]);
    }
  };

  // Función para actualizar la cantidad de productos en el carrito
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para acceder al contexto del carrito
export const useCart = () => useContext(CartContext);
