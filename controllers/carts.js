const { request } = require("express");
const Carts = require("../models/carts");
const CartsValidation = require("../helpers/cartValidation");
const errorFunction = require("../utils/errorFunction");
const Products = require("../controllers/products");
const Users = require("../controllers/users");
// CRUD
// CREATE - POST
const createCart = async (req, res, next) => {
  const user = await Users.findById(req.body.userId);
  const product = await Products.findById(req.body.productId);
  try {
    if (!user) {
      return res.json(
        errorFunction(true, 204, "This user Id have not in the database")
      );
    }
    if (!product) {
      return res.json(
        errorFunction(true, 204, "This product Id have not in the database")
      );
    } else {
      const newCart = await Carts.create(req.body);

      if (newCart) {
        return res
          .status(201)
          .json(errorFunction(false, 201, "Cart Created", newCart));
      } else {
        return res.status(403).json(errorFunction(true, "Error Creating Cart"));
      }
    }
  } catch (error) {
    console.log("ERRORS:", error);
    return res.status(403).json(errorFunction(true, "Error Creating Cart"));
  }
};

const getAllCarts = async (req, res, next) => {
  try {
    const {
      pageSize = 12,
      pageNumber = 1,
      productName = "",
      productBrand = "",
      orderByColumn,
      orderByDirection = "desc",
    } = req.query;
    const filter = {
      $and: [
        {
          productName: {
            $regex: productName,
            $options: "$i",
          },
        },
        {
          productBrand: {
            $regex: productBrand,
            $options: "$i",
          },
        },
      ],
    };
    const filterCarts = await Carts.find(filter)
      .sort(`${orderByDirection === "asc" ? "" : "-"}${orderByColumn}`)
      .limit(pageSize * 1)
      .skip((pageNumber - 1) * pageSize);

    const allCarts = await Carts.find(filter);

    let totalPage = 0;
    if (allCarts.length % pageSize === 0) {
      totalPage = allCarts.length / pageSize;
    } else {
      totalPage = parseInt(allCarts.length / pageSize) + 1;
    }

    if (allCarts.length > 0) {
      res.status(200).json({
        totalPage: totalPage,
        totalCarts: allCarts.length,
        orders:
          orderByDirection && orderByColumn
            ? filterCarts
            : filterCarts.reverse(),
      });
    } else {
      res.status(200).json({
        message: "No results",
        orders: [],
      });
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

//get by id
const getCartById = async (req, res, next) => {
  const CartId = req.params.CartId;
  try {
    const cart = await Carts.findById(CartId);
    if (order) {
      res.status(200).json({
        statusCode: 200,
        cart,
      });
    } else {
      res.json({
        statusCode: 204,
        massage: "This  carts Id have not in the database",
        carts: {},
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

//delete product by id
const deleteCartById = async (req, res, next) => {
  const cartId = req.params.cartId;

  try {
    const cart = await Carts.findByIdAndRemove(cartId);
    if (cart) {
      res.status(200).json({
        statusCode: 200,
        massage: "Delete cart successfully",
      });
    } else {
      res.json({
        statusCode: 204,
        massage: "This  cart Id have not in the database",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

const editCart = (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const isBodyEmpTy = Object.keys(req.body).length;
    if (isBodyEmpTy === 0) {
      return res.send({
        statuscode: 403,
        message: "Body request can not emty.",
      });
    }
    Carts.findByIdAndUpdate(cartId, req.body).then((data) => {
      if (data) {
        res.status(200).json({
          statuscode: 200,
          message: "Update cart successfully",
        });
      } else {
        res.json({
          statuscode: 204,
          message: "This cart Id is have not in the database ",
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

const addCart = async (req, res, next) => {
  try {
    // const { name, brand, price, type, quantity } = req.body;
    // if (!name || !brand || !type || !price || !quantity) {
    //   res.status(400).json({ message: 'Some fields not null' });
    // }
    const result = await addCartSchema.validateAsync(req.body);
    // let product = new Products(req.body);
    let cart = new Carts(result);
    order.save().then((response) => {
      res.json({
        message: "Added cart Successfully!",
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
  createCart,
  getAllCarts,
  getAllCarts,
  deleteCartById,
  editCart,
  getCartById,
};
