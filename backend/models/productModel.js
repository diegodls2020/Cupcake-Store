const db = require('../config/db');

const Product = {
  // Obtener todos los productos
  getAllProducts: (callback) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },
  
  // Agregar un nuevo producto
  addProduct: (product, callback) => {
    const query = 'INSERT INTO products SET ?';
    db.query(query, product, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  }
};

module.exports = Product;
