import React from "react";
import "../App.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Bienvenidos a Cupcake Store</h2>
        <p>
          Descubre nuestros deliciosos cupcakes, hechos con amor y los mejores
          ingredientes. ¡Endulza tu día con nuestros irresistibles sabores!
        </p>
        <button className="shop-now-btn">¡Compra Ahora!</button>
      </div>
      <div className="home-image">
        <img
          src="https://example.com/your-cupcake-image.jpg" // Cambia la URL por la imagen que desees
          alt="Cupcakes"
          className="home-img"
        />
      </div>
    </div>
  );
};

export default Home;
