const joi = require("joi");

const checkAddProduct = joi.object({
  productName: joi.string().min(5).max(100).required(),
  productBrand: joi.string().required(),
  type: joi.string().required(),
  info: joi.string().required(),
  price: joi.number().required(),
  discount: joi.number(),
  quantity: joi.number().required(),
  images: joi.array().items(joi.string().required()),
});
const patternPassword = /^[a-zA-Z0-9]{3,30}$/;
const patternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const checkAddUser = joi.object({
  username: joi.string().min(5).max(30).required(),
  password: joi
    .string()
    .min(5)
    .max(100)
    .pattern(new RegExp(patternPassword))
    .required(),
  firstName: joi.string().min(2).max(100).required(),
  lastName: joi.string().min(2).max(5).required(),
  phone: joi.string().max(10).required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .allow(""),
  address: joi.string().min(10).max(100).allow(""),
  avatar: joi.string().allow("").trim(),
  isAdmin: joi.boolean().required(),
});
// const addUserSchema = joi.object({
//   username: joi.string().min(5).max(30).required(),
//   password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
//   firstName: joi.string().min(2).max(100).required(),
//   lastName: joi.string().min(2).max(100).required(),
//   phone: joi.number().required(),
//   email: joi.string().pattern(new RegExp("^[w-.]+@([w-]+.)+[w-]{2,4}$")),
//   address: joi.string().min(10).max(200).required(),
//   avata: joi.string(),
// });
module.exports = { checkAddProduct, checkAddUser };
