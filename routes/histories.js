const express = require("express");
const route = express.Router();
const app = express();
const { allowCrossDomain } = require("../utils/corsMiddleware");

const HistoriesController = require("../controllers/histories");
const historieValidation = require("../helpers/historieValidation");
// app.use(cors({ origin: '*', credentials: true }))
app.use(allowCrossDomain);
route.post(
  "/api/histories/create",
  historieValidation,
  HistoriesController.createHistorie
);

route.get(
  "/api/histories/getAllCommentss",
  HistoriesController.getAllHistories
);
route.get(
  "/api/histories/getHistorieById/:historieId",
  HistoriesController.getHistorieById
);
route.delete(
  "/api/histories/deleteHistorieById/:historieId",
  HistoriesController.deleteHistorieById
);
route.patch(
  "/api/histories/editHistorieById/:historieId",
  HistoriesController.editHistorie
);

module.exports = route;
