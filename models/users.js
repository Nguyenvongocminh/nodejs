const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    pasword: {
      type: String,
      require: true,
    },
    firstname: {
      type: String,
      require: false,
    },
    lastname: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    email: {
      type: Number,
      require: false,
    },
    address: {
      type: String,
      require: false,
    },
    avatar: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);
const Products = mongoose.model("users", usersSchema);
module.exports = Products;
