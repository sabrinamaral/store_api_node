const Products = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  res.status(200).json({});
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObj = {};

  // filtering by featured, name or/and company
  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }
  let result = Products.find(queryObj);

  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("name");
  }

  //selecting fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
