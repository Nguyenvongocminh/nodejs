const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
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
      type: String,
      require: true,
    },
    email: {
      type: String,
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
    isAdmin: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);
const Users = mongoose.model("users", usersSchema);
module.exports = Users;
