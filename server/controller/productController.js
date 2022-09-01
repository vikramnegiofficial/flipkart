import Product from "../models/product_schema.js";

class ProductController {
  static getProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).send(products);
    } catch (e) {
      res.status(500).send({ message: e.message, status: failed });
    }
  };
}

export default ProductController;
