const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historiesSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
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
    orderStatus: {
      type: String,
      require: false,
    },
    userId: {
      type: String,
      require: true,
    },
    quantity: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: false,
    },

    images: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const Histories = mongoose.model("Histories", historiesSchema);
module.exports = Histories;
