const express = require("express");
const router = express.Router();

module.exports = (PostController) => {
  router.post("/", (req, res) => {
    PostController.create(req, res);
  });
  return router;
};
