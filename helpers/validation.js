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

const addUserSchema = joi.object({
  username: joi.string().min(5).max(30).required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  firstName: joi.string().min(2).max(100).required(),
  lastName: joi.string().min(2).max(100).required(),
  phone: joi.number().required(),
  email: joi.string().pattern(new RegExp("^[w-.]+@([w-]+.)+[w-]{2,4}$")),
  address: joi.string().min(10).max(200).required(),
  avata: joi.string(),
});
module.exports = { checkAddProduct, addUsersSchema };
