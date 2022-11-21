const joi = require("joi");
const errorFunction = require("../utils/errorFunction");

const validation = joi.object({
  customerName: joi.string().min(5).max(100).required(),
  productId: joi.string().min(5).max(100).required(),
  comment: joi.string().min(5).max(100).required(),
  id: joi.string().min(5).max(100).required(),
  rating: joi.string().required(""),
});

const commentValidation = async (req, res, next) => {
  const { error } = validation.validate(req.body);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, 406, `Error in User Data: ${error.message}`)
    );
  } else {
    next();
  }
};
module.exports = commentValidation;
