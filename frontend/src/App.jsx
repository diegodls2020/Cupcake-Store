import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import CartPage from "./pages/CartPage";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [cart, setCart] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [isAddressEntered, setIsAddressEntered] = useState(false);
  const navigate = useNavigate();

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        return updatedCart;
      } else {
        return [...prevCart, product];
      }
    });
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCart([]); // Limpiar el carrito
  };

  const handleAddressChange = (event) => {
    setShippingAddress(event.target.value);
  };

  const handleAddressSubmit = (event) => {
    event.preventDefault();
    if (shippingAddress.trim() === "") {
      alert("Por favor ingresa una dirección de envío.");
      return;
    }
    setIsAddressEntered(true);
  };

  // Lógica de pago y redirección
  const checkout = () => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirigir a login si no está autenticado
      return;
    }

    if (!isAddressEntered) {
      setPaymentMessage(
        "Por favor, ingresa una dirección de envío antes de continuar."
      );
      return;
    }

    // Procesamiento de pago
    setPaymentStatus("success");
    setPaymentMessage("¡Pago realizado con éxito! Gracias por tu compra.");

    clearCart(); // Limpiar el carrito después de la compra

    // Limpiar el mensaje de pago después de 2 segundos y redirigir
    setTimeout(() => {
      setPaymentStatus(null);
      setPaymentMessage("");
      navigate("/"); // Redirigir a la página de inicio después del pago
    }, 2000);
  };

  return (
    <>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={<CartPage cart={cart} checkout={checkout} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
      <Footer />

      {paymentStatus && (
        <div className="payment-message">
          <div className="payment-message-content">
            <p>{paymentMessage}</p>
            <button
              onClick={() => {
                setPaymentStatus(null);
                setPaymentMessage("");
                navigate("/"); // Redirigir a inicio si el mensaje es cerrado
              }}
              className="close-payment-btn"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
