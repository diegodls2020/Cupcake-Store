import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importar useNavigate
import "../App.css";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Crear instancia de useNavigate
  const paymentMessage = location.state?.paymentMessage; // Obtener el mensaje enviado desde el carrito

  const goToProducts = () => {
    navigate("/products"); // Redirigir a la página de productos
  };

  return (
    <div className="home-container">
      {/* Mostrar el mensaje de éxito si existe */}
      {paymentMessage && (
        <div className="success-message">{paymentMessage}</div>
      )}

      <div className="home-content">
        <h2>Benvindos a Cupcake Store</h2>
        <p>
          Conheça nossos deliciosos cupcakes, feitos com amor e o melhor
          ingredientes. Adoce o seu dia com nossos sabores irresistíveis!
        </p>
        {/* Botón que redirige a la página de productos */}
        <button className="shop-now-btn" onClick={goToProducts}>
          Comprar agora!
        </button>
      </div>

      <div className="home-image">
        <img
          src={`http://localhost:5000/images/background.jpg`}
          alt="Cupcakes"
          className="home-img"
        />
      </div>
    </div>
  );
};

export default Home;
