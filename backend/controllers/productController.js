const Product = require('../models/productModel');

// Obtener todos los productos
exports.getProducts = (req, res) => {
  Product.getAllProducts((err, products) => {
    if (err) {
      return res.status(500).send('Error fetching products');
    }
    res.json(products);
  });
};

// Agregar un nuevo producto
exports.addProduct = (req, res) => {
  const newProduct = req.body;
  Product.addProduct(newProduct, (err, result) => {
    if (err) {
      return res.status(500).send('Error adding product');
    }
    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  });
};
