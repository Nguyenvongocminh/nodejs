const express = require("express");
const route = express.Router();
const app = express();
const { allowCrossDomain } = require("../utils/corsMiddleware");

const CartsController = require("../controllers/carts");
const cartValidation = require("../helpers/cartValidation");
// app.use(cors({ origin: '*', credentials: true }))
app.use(allowCrossDomain);
route.post("/api/carts/create", cartValidation, CartsController.createCart);

// route.post("/api/users/create", UsersController.createUser);
route.get("/api/carts/getAllCarts", CartsController.getAllCarts);
route.get("/api/carts/getCartById/:cartId", CartsController.getCartById);
route.delete(
  "/api/carts/deleteCartById/:cartId",
  CartsController.deleteCartById
);
route.patch("/api/carts/editCartById/:cartId", CartsController.editCart);

module.exports = route;
