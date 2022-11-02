const Users = require("../models/users");
const { request } = require("express");
const userValidation = require("../helpers/validation");
const errorFunction = require("../utils/errorFunction");
const securePassword = require("../utils/securePassword");

// CRUD
// CREATE - POST
const addUser = async (req, res, next) => {
  try {
    const existingEmail = await Users.findOne({
      email: req.body.email,
    });
    const existingUsername = await Users.findOne({
      username: req.body.username,
    }).lean(true);

    if (existingEmail || existingUsername) {
      res.status(403);
      return res.json(errorFunction(true, "User Already Exists"));
    } else {
      const hashedPassword = await securePassword(req.body.password);
      const newUser = await Users.create({
        username: req.body.username,
        password: hashedPassword,
        fistName: req.body.fistName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        avatar: req.body.avatar,
        role: req.body.role,
      });
      if (newUser) {
        return res
          .status(201)
          .json(errorFunction(false, 201, "User Created", newUser));
      } else {
        return res.status(403).json(errorFunction(true, "Error Creating User"));
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Bad request.",
      error,
      statusCode: 400,
    });
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const allUsers = await Users.find();
    if (Users.length > 0) {
      res.status(200).json({
        Users: allUsers.reverse(),
      });
    } else {
      res.status(200).json({
        message: "no results",
        Users: [],
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Bab request",
    });
  }
};

const createUser = async (req, res, next) => {
  try {
    const validReq = await UserValidation.checkAddUser.validateAsync(req.body);
    let user = new Users(validReq);
    user.save().then((reesponse) => {
      res.json({
        massage: "Added User successfully",
      });
    });
  } catch (error) {
    console.log("ERRORS:", error);
    return res.status(400).json({
      statusCode: 400,
      message: "Bad request.",
      errormessage: error.details[0].message,
    });
  }
};

//get all products
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.find();
    if (allUsers.length > 0) {
      res.status(200).json({
        user: allUsers.reverse(),
      });
    } else {
      res.status(200).json({
        massage: "No results",
        users,
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

//get by id

const getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await Users.findById(userId);
    if (user) {
      res.status(200).json({
        statusCode: 200,
        user,
      });
    } else {
      res.json({
        statusCode: 204,
        massage: "This  user Id have not in the database",
        users: {},
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

//delete user by id
const deleteUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findByIdAndRemove(userId);
    if (user) {
      res.status(200).json({
        statusCode: 200,
        massage: "Delete user successfully",
      });
    } else {
      res.json({
        statusCode: 204,
        massage: "This  user Id have not in the database",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

const editUser = (req, res, next) => {
  try {
    let userId = req.params.userID;
    const isBodyEmpty = Object.keys(req.body).length;
    if (isBodyEmpty === 0) {
      return res.send({
        statuscode: 403,
        message: "Body request can not emty.",
      });
    }
    Users.findByIdAndUpdate(userId, req.body).then((data) => {
      if (data) {
        res.status(200).json({
          statuscode: 200,
          message: "Update product successfully",
        });
      } else {
        res.json({
          statuscode: 204,
          message: "This user Id is have not in the database ",
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

// const addUser = async (req, res, next) => {
//   try {
//     // const { name, brand, price, type, quantity } = req.body;
//     // if (!name || !brand || !type || !price || !quantity) {
//     //   res.status(400).json({ message: 'Some fields not null' });
//     // }
//     const result = await addUsersSchema.validateAsync(req.body);
//     // let product = new Products(req.body);
//     let user = new Users(result);
//     user.save().then((response) => {
//       res.json({
//         message: "Added user Successfully!",
//       });
//     });
//   } catch (error) {
//     console.log("ERRORS: ", error);
//     return res.status(400).json({
//       errors: error.details,
//     });
//   }
// };

module.exports = {
  addUser,
  createUser,
  getAllUsers,
  deleteUserById,
  editUser,
  getUserById,
};
