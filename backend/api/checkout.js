import checkoutController from "../controllers/checkoutController";

export default function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    checkoutController.createOrder(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
