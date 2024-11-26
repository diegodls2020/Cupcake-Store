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
        setProducts(data); // Asignar productos a la variable de estado
      } catch (error) {
        console.error("Error fetching products: ", error); // Log para detalles del error
        setError(
          "Os produtos não podem ser carregados. Por favor, verifique o back-end."
        );
      } finally {
        setLoading(false); // Termina el loading
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="titulo">
      <h3>Cupcake Store</h3>
      <div className="principal">
        {loading ? (
          <p>Carregando produtos...</p>
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
    </div>
  );
};

export default Products;
