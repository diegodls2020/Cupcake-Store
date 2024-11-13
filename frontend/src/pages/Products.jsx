import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data); // Establece los productos en el estado
      } catch (error) {
        console.error("Error fetching products: ", error);
        setError(
          "Error al cargar los productos. Por favor, verifica el backend."
        );
      } finally {
        setLoading(false); // Cambia el estado de carga cuando la solicitud finalice
      }
    };

    fetchProducts();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap",
        padding: "2rem",
      }}
    >
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p>{error}</p> 
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart} 
          />
        ))
      )}
    </div>
  );
};

export default Products;
