import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [products, setProducts] = useState([]); // Lista de productos agregados

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Erro ao buscar os pedidos:", error);
      }
    };

    fetchOrders();
  }, []);

  // Maneja la entrada del formulario para los productos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar el formulario para agregar un nuevo producto
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/add",
        productForm
      );
      alert(response.data.message);
      // Agregar el producto a la lista de productos locales
      setProducts((prev) => [...prev, productForm]);
      setProductForm({ name: "", description: "", price: "", image: "" });
    } catch (error) {
      console.error("Erro ao adicionar o produto:", error);
      alert("Houve um erro ao adicionar o produto.");
    }
  };

  // Ver los detalles de un pedido
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/${orderId}` // Ruta correcta
      );
      setOrderDetails(response.data);
      setSelectedOrder(orderId);
    } catch (error) {
      console.error("Erro ao buscar os detalhes do pedido:", error);
    }
  };

  // Eliminar producto de la lista y del backend
  const handleDeleteProduct = async (productIndex) => {
    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir este produto?"
    );
    if (confirmDelete) {
      try {
        const productToDelete = products[productIndex];
        // Llamada a la API para eliminar el producto
        const response = await axios.delete(
          `http://localhost:5000/api/products/${productToDelete.id}`
        );
        alert(response.data.message);
        // Eliminar el producto del estado
        setProducts((prev) =>
          prev.filter((_, index) => index !== productIndex)
        );
      } catch (error) {
        console.error("Erro ao excluir o produto:", error);
        alert("Houve um erro ao excluir o produto.");
      }
    }
  };

  return (
    <div className="admin-page">
      <h1 className="title">Painel de Administração</h1>
      <div className="admin-container">
        <section className="orders-section">
          <h2>Gestão de Pedidos</h2>
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(order.fecha).toLocaleDateString()}
                </p>

                <p>
                  <strong>Cliente:</strong> {order.nombre_cliente}
                </p>
                <p>
                  <strong>Endereço:</strong> {order.direccion_envio}
                </p>
                <p>
                  <strong>Total:</strong> R${order.total}
                </p>
                <button
                  onClick={() => fetchOrderDetails(order.id)}
                  className="btn-details"
                >
                  Ver Detalhes
                </button>
                {selectedOrder === order.id && (
                  <div className="order-details">
                    <h3>Pedido</h3>
                    <ul className="details-list">
                      {orderDetails.map((detail) => (
                        <li key={detail.id}>
                        Codigo do Produto: {detail.producto_id}  Quantidade:{" "}
                          {detail.cantidad}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="product-form-section">
          <h2>Adicionar Novo Produto</h2>
          <form onSubmit={handleProductSubmit} className="product-form">
            <input
              type="text"
              name="name"
              placeholder="Nome do Produto"
              value={productForm.name}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Descrição"
              value={productForm.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Preço"
              value={productForm.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="URL da Imagem"
              value={productForm.image}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="btn-submit">
              Adicionar Produto
            </button>
          </form>
        </section>

        <section className="product-list-section">
          <h2>Produtos Cadastrados</h2>
          <ul className="product-list">
            {products.length > 0 ? (
              products.map((product, index) => (
                <li key={index} className="product-item">
                  <p>
                    <strong>Nome:</strong> {product.name}
                  </p>
                  <p>
                    <strong>Preço:</strong> R${product.price}
                  </p>
                  <button
                    onClick={() => handleDeleteProduct(index)}
                    className="btn-delete"
                  >
                    Excluir Produto
                  </button>
                </li>
              ))
            ) : (
              <p>Nenhum produto adicionado ainda.</p>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
