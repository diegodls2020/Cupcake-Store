// Cambiar importación ES6 a CommonJS
const checkoutController = require("../controllers/checkoutController");

module.exports = function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    checkoutController.createOrder(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
