const { request } = require("express");
const Orders = require("../models/orders");
const OrdersValidation = require("../helpers/orderValidation");
const errorFunction = require("../utils/errorFunction");

const createOrder = async (req, res, next) => {
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
      const newOrder = await Orders.create(req.body);

      if (newOrder) {
        return res
          .status(201)
          .json(errorFunction(false, 201, "Order Created", newOrder));
      } else {
        return res
          .status(403)
          .json(errorFunction(true, "Error Creating Order"));
      }
    }
  } catch (error) {
    console.log("ERRORS:", error);
    return res.status(403).json(errorFunction(true, "Error Creating Order"));
  }
};
////
const addOrderProduct = async (req, res, next) => {
  //get userId fron body request
  //get user by userId and check in DB
  //IF-ELSE
  //get productId from body request
  //get product by productId and check in DB
  //IF-ELSE
  //IF product >= check quantity of this product (10)
  //IF quantity of body request (2) >= quantity of this product in stock => OK
  //UPDATE quantity of product in stock(😎
  //ELSE => show message

  try {
    const quantity = req.body.quantity;
    const user = await Users.findById(req.body.userId);
    const product = await Products.findById(req.body.productId);
    const requestProduct = { quantity: product.quantity - quantity };
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
      if (quantity <= product.quantity) {
        //Mua
        const newOrder = await Orders.create(req.body);
        if (newOrder) {
          //UPDATE PRODUCT
          Products.findByIdAndUpdate(req.body.productId, requestProduct).then(
            (data) => {
              if (data) {
                res.status(201);
                return res.json(
                  errorFunction(false, 201, "Order Create", newOrder)
                );
              } else {
                return res.json(errorFunction(true, 400, "Bad request"));
              }
            }
          );
        } else {
          res.status(403);
          return res.json(errorFunction(true, 403, "Error Creating Order"));
        }
      } else {
        //Show Message
        return res.json(
          errorFunction(
            true,
            206,
            "The quantity is greater than quantity in the stock"
          )
        );
      }
    }
  } catch (error) {
    res.status(400);
    return res.json(errorFunction(true, 400, "Bad request"));
  }
};

const getAllOrders = async (req, res, next) => {
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
    const filterOrders = await Orders.find(filter)
      .sort(`${orderByDirection === "asc" ? "" : "-"}${orderByColumn}`)
      .limit(pageSize * 1)
      .skip((pageNumber - 1) * pageSize);

    const allOrders = await Orders.find(filter);

    let totalPage = 0;
    if (allOrders.length % pageSize === 0) {
      totalPage = allOrders.length / pageSize;
    } else {
      totalPage = parseInt(allOrders.length / pageSize) + 1;
    }

    if (allOrders.length > 0) {
      res.status(200).json({
        totalPage: totalPage,
        totalOrders: allOrders.length,
        orders:
          orderByDirection && orderByColumn
            ? filterOrders
            : filterOrders.reverse(),
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
const getOrderById = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Orders.findById(orderId);
    if (order) {
      res.status(200).json({
        statusCode: 200,
        order,
      });
    } else {
      res.json({
        statusCode: 204,
        massage: "This  orders Id have not in the database",
        orders: {},
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
const deleteOrderById = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await Orders.findByIdAndRemove(orderId);
    if (order) {
      res.status(200).json({
        statusCode: 200,
        massage: "Delete order successfully",
      });
    } else {
      res.json({
        statusCode: 204,
        massage: "This  order Id have not in the database",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

const editOrder = (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const isBodyEmpTy = Object.keys(req.body).length;
    if (isBodyEmpTy === 0) {
      return res.send({
        statuscode: 403,
        message: "Body request can not emty.",
      });
    }
    Orders.findByIdAndUpdate(orderId, req.body).then((data) => {
      if (data) {
        res.status(200).json({
          statuscode: 200,
          message: "Update order successfully",
        });
      } else {
        res.json({
          statuscode: 204,
          message: "This order Id is have not in the database ",
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

const addOrder = async (req, res, next) => {
  try {
    // const { name, brand, price, type, quantity } = req.body;
    // if (!name || !brand || !type || !price || !quantity) {
    //   res.status(400).json({ message: 'Some fields not null' });
    // }
    const result = await addOrderSchema.validateAsync(req.body);
    // let product = new Products(req.body);
    let order = new Orders(result);
    order.save().then((response) => {
      res.json({
        message: "Added order Successfully!",
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
  createOrder,
  getAllOrders,
  getAllOrders,
  deleteOrderById,
  editOrder,
  getOrderById,
  addOrderProduct,
};
