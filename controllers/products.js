const Products = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  res.status(200).json({});
};
const getAllProducts = async (req, res) => {
  const products = await Products.find(req.query);

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
