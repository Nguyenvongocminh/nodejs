const { request } = require("express");
const Histories = require("../models/histories");
const historieValidation = require("../helpers/historieValidation");
const errorFunction = require("../utils/errorFunction");
const Products = require("../models/products");
const Users = require("../models/users");

const createHistorie = async (req, res, next) => {
  try {
    const newHistorie = await Historie.create(req.body);

    if (newHistorie) {
      return res
        .status(201)
        .json(errorFunction(false, 201, "Historie Created", newHistorie));
    } else {
      return res
        .status(403)
        .json(errorFunction(true, "Error Creating Historie"));
    }
  } catch (error) {
    console.log("ERRORS:", error);
    return res.status(403).json(errorFunction(true, "Error Creating Historie"));
  }
};

// const createComment = async (req, res, next) => {
//   const user = await Users.findById(req.body.userId);
//   const product = await Products.findById(req.body.productId);
//   try {
//     if (!user) {
//       return res.json(
//         errorFunction(true, 204, "This user Id have not in the database")
//       );
//     }
//     if (!product) {
//       return res.json(
//         errorFunction(true, 204, "This product Id have not in the database")
//       );
//     } else {
//       const newComment = await Comments.create(req.body);

//       if (newComment) {
//         return res
//           .status(201)
//           .json(errorFunction(false, 201, "Comment Created", newComment));
//       } else {
//         return res.status(403).json(errorFunction(true, "Error Creating Comment"));
//       }
//     }
//   } catch (error) {
//     console.log("ERRORS:", error);
//     return res.status(403).json(errorFunction(true, "Error Creating Comment"));
//   }
// };

const getAllHistories = async (req, res, next) => {
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
    const filterHistories = await Histories.find(filter)
      .sort(`${orderByDirection === "asc" ? "" : "-"}${orderByColumn}`)
      .limit(pageSize * 1)
      .skip((pageNumber - 1) * pageSize);

    const allHistories = await Histories.find(filter);

    let totalPage = 0;
    if (allComments.length % pageSize === 0) {
      totalPage = allComments.length / pageSize;
    } else {
      totalPage = parseInt(allComments.length / pageSize) + 1;
    }

    if (allHistories.length > 0) {
      res.status(200).json({
        totalPage: totalPage,
        totalComments: allCComments.length,
        orders:
          orderByDirection && orderByColumn
            ? filterHistories
            : filterHistories.reverse(),
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
const getHistorieById = async (req, res, next) => {
  const HistorieId = req.params.CommentId;
  try {
    const historie = await Histories.findById(HistorieId);
    if (order) {
      res.status(200).json({
        statusCode: 200,
        historie,
      });
    } else {
      res.json({
        statusCode: 204,
        massage: "This  Histories Id have not in the database",
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
const deleteHistorieById = async (req, res, next) => {
  const historieId = req.params.historieId;

  try {
    const historie = await Histories.findByIdAndRemove(historieId);
    if (cart) {
      res.status(200).json({
        statusCode: 200,
        massage: "Delete Historie successfully",
      });
    } else {
      res.json({
        statusCode: 204,
        massage: "This  Historie Id have not in the database",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

const editHistorie = (req, res, next) => {
  try {
    const historieId = req.params.historieId;
    const isBodyEmpTy = Object.keys(req.body).length;
    if (isBodyEmpTy === 0) {
      return res.send({
        statuscode: 403,
        message: "Body request can not emty.",
      });
    }
    Histories.findByIdAndUpdate(historieId, req.body).then((data) => {
      if (data) {
        res.status(200).json({
          statuscode: 200,
          message: "Update Historie successfully",
        });
      } else {
        res.json({
          statuscode: 204,
          message: "This Historie Id is have not in the database ",
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

const addHistorie = async (req, res, next) => {
  try {
    const result = await addCommentSchema.validateAsync(req.body);
    // let product = new Products(req.body);
    let Historie = new Histories(result);
    order.save().then((response) => {
      res.json({
        message: "Added Historie Successfully!",
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
  createHistorie,
  getAllHistories,
  getAllHistories,
  deleteHistorieById,
  editHistorie,
  getHistorieById,
};
