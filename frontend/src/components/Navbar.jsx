// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cart }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        backgroundColor: "#f8b195",
      }}
    >
      <Link
        to="/"
        style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
      >
        Inicio
      </Link>
      <Link
        to="/products"
        style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
      >
        Produtos
      </Link>
      <Link
        to="/contact"
        style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
      >
        Contato
      </Link>
      <Link
        to="/cart"
        style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
      >
        Carrinho ({cart.length})
      </Link>
    </nav>
  );
};

export default Navbar;
