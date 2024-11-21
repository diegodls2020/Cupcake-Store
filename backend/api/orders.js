import orderController from "../controllers/orderController";

export default function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    orderController.createOrder(req, res);
  } else if (method === "GET") {
    orderController.getOrders(req, res);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
