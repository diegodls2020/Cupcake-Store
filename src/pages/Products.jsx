import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

// Utilizamos el hook useState y useEffect para manejar la solicitud al backend
const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch de productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Solicitud al backend para obtener los productos
        const response = await fetch('http://localhost:5000/api/products'); // URL del backend
        const data = await response.json();
        
        // Guardamos los productos en el estado
        setProducts(data); 
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', padding: '2rem' }}>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))
      )}
    </div>
  );
};

export default Products;
