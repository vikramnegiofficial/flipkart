import { products } from "./data/data.js";
import Product from "./models/product_schema.js";

const DefaultData = async () => {
  try {
    await Product.insertMany(products);
    console.log("Data Inserted Successfully");
  } catch (e) {
    console.log("Unsuccessful Insertion : ", e.message);
  }
};

export default DefaultData;
