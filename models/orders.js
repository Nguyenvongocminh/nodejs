const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema(
  {
    productId: {
      type: String,
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    productBrand: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: false,
    },
    userId: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: false,
    },
    quantity: {
      type: Number,
      require: true,
    },
    images: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    orderStatus: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;
