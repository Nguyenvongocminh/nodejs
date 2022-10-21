const Products = require("../models/products");

// CRUD
// CREATE - POST
const createProduct = (req, res, next) => {
  try {
    const { productName, productBrand, type, price, quantity, images } =
      req.body;
    if (
      !productName ||
      !productBrand ||
      !type ||
      !price ||
      !quantity ||
      !images
    ) {
      res.status(400).json({
        statusCode: 400,
        message: "Some fields are not empty.",
      });
    }
    let product = new Products(req.body);
    product.save().then((response) => {
      res.json({
        message: "Added product successfully!",
      });
    });
  } catch (error) {
    console.log(error);
  }
};

//get all products

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Products.find();
    if (allProducts.length > 0) {
      res.status(200).json({
        product: allProducts.reverse(),
      });
    } else {
      res.status(200).json({
        massage: "No results",
        products,
      });
    }
  } catch (error) {
    console.log("erorr", erorr);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

//get by id
const getProductById = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Products.findById(productId);
    if (product) {
      res.status(200).json({
        statusCode: 200,
        product,
      });
    } else {
      res.json({
        statusCode: 204,
        massage: "This  product Id have not in the database",
        products: {},
      });
    }
  } catch (error) {
    console.log("erorr", erorr);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

//delete product by id
const deleteProductById = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Products.findByIdAndRemove(productId);
    if (product) {
      res.status(200).json({
        statusCode: 200,
        massage: "Delete product successfully",
      });
    } else {
      res.json({
        statusCode: 204,
        massage: "This  product Id have not in the database",
      });
    }
  } catch (error) {
    console.log("erorr", erorr);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

const editProduct = (req, res, next) => {
  try {
    let productId = req.params.productId;
    if (!req.body) {
      return res.send({
        statuscode: 404,
        message: "Body request can not emty.",
      });
    }
    Products.findByIdAndUpdate(productId, req.body).then((data) => {
      if (data) {
        res.status(200).json({
          statuscode: 200,
          message: "Update product successfully",
        });
      } else {
        res.json({
          statuscode: 204,
          message: "This product Id is have not in the database ",
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      statuscode: 400,
      message: "Bad request",
    });
  }
};

const addProduct = async (req, res, next) => {
  try {
    // const { name, brand, price, type, quantity } = req.body;
    // if (!name || !brand || !type || !price || !quantity) {
    //   res.status(400).json({ message: 'Some fields not null' });
    // }
    const result = await addProductSchema.validateAsync(req.body);
    // let product = new Products(req.body);
    let product = new Products(result);
    product.save().then((response) => {
      res.json({
        message: "Added product Successfully!",
      });
    });
  } catch (error) {
    console.log("ERRORS: ", error);
    return res.status(400).json({
      errors: error.details,
    });
  }
};

// READ - GET || POST
// UPDATE - PUT || PATCH
// DELETE - DELETE

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  editProduct,
};