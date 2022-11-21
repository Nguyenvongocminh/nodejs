const express = require("express");
const route = express.Router();
const app = express();
const { allowCrossDomain } = require("../utils/corsMiddleware");

const CommentsController = require("../controllers/comments");
const commentValidation = require("../helpers/commentValidation");
// app.use(cors({ origin: '*', credentials: true }))
app.use(allowCrossDomain);
route.post(
  "/api/comments/create",
  commentValidation,
  CommentsController.createComment
);

route.get("/api/comments/getAllCommentss", CommentsController.getAllComments);
route.get(
  "/api/comments/getCartById/:cartId",
  CommentsController.getCommentById
);
route.delete(
  "/api/carts/deleteCartById/:cartId",
  CommentsController.deleteCommentById
);
route.patch("/api/carts/editCartById/:cartId", CommentsController.editComment);

module.exports = route;
