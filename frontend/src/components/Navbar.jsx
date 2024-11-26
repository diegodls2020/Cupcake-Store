import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Importa el hook del contexto
import icon from "../assets/react.svg";

const Navbar = () => {
  const { cart } = useCart(); // Obtén el carrito del contexto

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        backgroundColor: "#f67280",
      }}
    >
      {/* Logo e inicio */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={icon}
          alt="Logo"
          style={{
            width: "40px",
            height: "40px",
            marginRight: "10px",
          }}
        />
        <Link
          to="/"
          style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
        >
          Home
        </Link>
      </div>
      <Link
        to="/products"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        Produtos
      </Link>
      <Link
        to="/contact"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        Contato
      </Link>
      <Link
        to="/cart"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        Carrinho ({cart.length})
      </Link>
    </nav>
  );
};

export default Navbar;
