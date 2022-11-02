const express = require("express");
const mongoose = require("mongoose");
const ProductsRoute = require("./routes/products");
const bodyParser = require("body-parser");
const UsersRoute = require("./routes/users");

const connection_string =
  "mongodb+srv://admin:2302@cluster0.bmq3fp9.mongodb.net/test";

mongoose.connect(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

const app = express();

app.use(express.json());

const PORT = 5000;
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

app.use("", ProductsRoute);
app.use("", UsersRoute);
