require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ProductsRoute = require("./routes/products");
const bodyParser = require("body-parser");
const UsersRoute = require("./routes/users");
const test = process.env.TEST;
const OrdersRoute = require("./routes/orders");
const connection_string = process.env.CONNECTION_STRING;
const CartsRoute = require("./routes/carts");
const CommentsRoute = require("./routes/comments");
const HistoriesRoute = require("./routes/histories");
mongoose.connect(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

const app = express();

app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
  console.log(`server is running on PORT ${PORT}`);
});
database.on("eror", (eror) => {
  console.log(eror);
});
database.once("connected", () => {
  console.log("Database Connected");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  "",
  ProductsRoute,
  UsersRoute,
  OrdersRoute,
  CartsRoute,
  CommentsRoute,
  HistoriesRoute
);
