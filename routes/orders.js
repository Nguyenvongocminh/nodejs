const express = require("express");
const route = express.Router();
const app = express();
const { allowCrossDomain } = require("../utils/corsMiddleware");

const OrdersController = require("../controllers/orders");
const orderValidation = require("../helpers/orderValidation");
// app.use(cors({ origin: '*', credentials: true }))
app.use(allowCrossDomain);
route.post("/api/orders/create", orderValidation, OrdersController.createOrder);
route.post(
  "/api/orders/addOrderProduct",
  orderValidation,
  OrdersController.addOrderProduct
);

// route.post("/api/users/create", UsersController.createUser);
route.get("/api/orders/getAllOrders", OrdersController.getAllOrders);
route.get("/api/orders/getOrderById/:orderId", OrdersController.getOrderById);
route.delete(
  "/api/orders/deletOrderById/:orderId",
  OrdersController.deleteOrderById
);
route.patch("/api/orders/editOrderById/:orderId", OrdersController.editOrder);

module.exports = route;
