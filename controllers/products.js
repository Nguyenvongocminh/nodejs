const Products = require("../models/products");

//CRUD
//CREATE-POST
const createProduct = (req, res, next) => {
  try {
    const {
      productName,
      productBrand,
      type,
      price,
      discount,
      quantity,
      images,
    } = req.body;
    if (
      !productName ||
      !productBrand ||
      !type ||
      !price ||
      !discount ||
      !quantity ||
      !images
    ) {
      res.status(400).json({
        statuscode: 400,
        message: "Some fileds are not empty.",
      });
    }
    let product = new Products(req.body);
    // product.save()
    product.save().then((response) => {
      res.json({
        message: "Added product successfully!",
      });
    });
  } catch (error) {
    console.log(error);
  }
};

//READ-GET  || POST
//UPDATE-PUT||PATCH
//DELETE-DELETE
module.exports = { createProduct };
