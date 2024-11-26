// Cambiar importación ES6 a CommonJS
const productController = require("../controllers/productController");

module.exports = function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    productController.getAllProducts(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
