const express = require("express");
const cors = require("cors");
const route = express.Router();
const app = express();
const { allowCrossDomain } = require("../utils/corsMiddleware");
const userValidation = require("../helpers/userValidation");

//CORS middleware
// var allowCrossDomain = function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
//   res.header("Access-Control-Allow-Headers", "Content-Type");

//   next();
// };

const UsersController = require("../controllers/users");
// app.use(cors({ origin: '*', credentials: true }))
app.use(allowCrossDomain);
route.post("/api/auths/register", userValidation, UsersController.addUser);

// route.post("/api/users/create", UsersController.createUser);
route.get("/api/users/getAllUsers", UsersController.getAllUsers);
route.get("/api/users/getUserById/:userId", UsersController.getUserById);
route.delete(
  "/api/users/deletUserById/:userId",
  UsersController.deleteUserById
);
route.patch("/api/users/editUserById/:userId", UsersController.editUser);

module.exports = route;
