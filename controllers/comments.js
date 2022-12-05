const { request } = require("express");
const Comments = require("../models/comments");
const commentValidation = require("../helpers/commentValidation");
const errorFunction = require("../utils/errorFunction");
const Products = require("../controllers/products");
const Users = require("../controllers/users");

// const createComment = async (req, res, next) => {
//   try {
//     const newComment = await Comments.create(req.body);

//     if (newComment) {
//       return res
//         .status(201)
//         .json(errorFunction(false, 201, "Comment Created", newComment));
//     } else {
//       return res
//         .status(403)
//         .json(errorFunction(true, "Error Creating Comment"));
//     }
//   } catch (error) {
//     console.log("ERRORS:", error);
//     return res.status(403).json(errorFunction(true, "Error Creating Comment"));
//   }
// };

const createComment = async (req, res, next) => {
  const user = await Users.findById(req.body.userId);
  const product = await Products.findById(req.body.productId);
  try {
    if (!user) {
      return res.json(
        errorFunction(true, 204, "This user Id have not in the database")
      );
    }
    if (!product) {
      return res.json(
        errorFunction(true, 204, "This product Id have not in the database")
      );
    } else {
      const newComment = await Comments.create(req.body);

      if (newComment) {
        return res
          .status(201)
          .json(errorFunction(false, 201, "Comment Created", newComment));
      } else {
        return res.status(403).json(errorFunction(true, "Error Creating Cart"));
      }
    }
  } catch (error) {
    console.log("ERRORS:", error);
    return res.status(403).json(errorFunction(true, "Error Creating Cart"));
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const {
      pageSize = 12,
      pageNumber = 1,
      customerName = "",
      comment = "",
      orderByColumn,
      orderByDirection = "desc",
    } = req.query;
    const filter = {
      $and: [
        {
          customerName: {
            $regex: customerName,
            $options: "$i",
          },
        },
        {
          comment: {
            $regex: comment,
            $options: "$i",
          },
        },
      ],
    };
    const filterComments = await Comments.find(filter)
      .sort(`${orderByDirection === "asc" ? "" : "-"}${orderByColumn}`)
      .limit(pageSize * 1)
      .skip((pageNumber - 1) * pageSize);

    const allComments = await Comments.find(filter);

    let totalPage = 0;
    if (allComments.length % pageSize === 0) {
      totalPage = allComments.length / pageSize;
    } else {
      totalPage = parseInt(allComments.length / pageSize) + 1;
    }

    if (allComments.length > 0) {
      res.status(200).json({
        totalPage: totalPage,
        totalComments: allCComments.length,
        orders:
          orderByDirection && orderByColumn
            ? filterCarts
            : filterCarts.reverse(),
      });
    } else {
      res.status(200).json({
        message: "No results",
        orders: [],
      });
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

//get by id
const getCommentById = async (req, res, next) => {
  const CommentId = req.params.CommentId;
  try {
    const comment = await Comments.findById(CommentId);
    if (order) {
      res.status(200).json({
        statusCode: 200,
        comment,
      });
    } else {
      res.json({
        statusCode: 204,
        massage: "This  comments Id have not in the database",
        carts: {},
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

//delete product by id
const deleteCommentById = async (req, res, next) => {
  const commentId = req.params.commentId;

  try {
    const comment = await Comments.findByIdAndRemove(commentId);
    if (cart) {
      res.status(200).json({
        statusCode: 200,
        massage: "Delete comment successfully",
      });
    } else {
      res.json({
        statusCode: 204,
        massage: "This  comment Id have not in the database",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

const editComment = (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const isBodyEmpTy = Object.keys(req.body).length;
    if (isBodyEmpTy === 0) {
      return res.send({
        statuscode: 403,
        message: "Body request can not emty.",
      });
    }
    Comments.findByIdAndUpdate(commentId, req.body).then((data) => {
      if (data) {
        res.status(200).json({
          statuscode: 200,
          message: "Update comment successfully",
        });
      } else {
        res.json({
          statuscode: 204,
          message: "This comment Id is have not in the database ",
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      statuscode: 400,
      message: "Bad request",
    });
  }
};

const addComment = async (req, res, next) => {
  try {
    const result = await addCommentSchema.validateAsync(req.body);
    // let product = new Products(req.body);
    let Comment = new Comments(result);
    order.save().then((response) => {
      res.json({
        message: "Added Comment Successfully!",
      });
    });
  } catch (error) {
    console.log("ERRORS: ", error);
    return res.status(400).json({
      errors: error.details,
    });
  }
};

// READ - GET || POST
// UPDATE - PUT || PATCH
// DELETE - DELETE

module.exports = {
  createComment,
  getAllComments,
  getAllComments,
  deleteCommentById,
  editComment,
  getCommentById,
};
