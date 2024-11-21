import productController from "../controllers/productController";

export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    productController.getAllProducts(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
