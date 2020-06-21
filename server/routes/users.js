const express = require("express");
const router = express.Router();
const connection = require("../connection/connection");

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

const userModel = require("../models/user");

/**
 * @swagger
 * /users/getList:
 *  get:
 *    description: Get user list
 *    responses:
 *      "200":
 *        description: A successful response
 *    tags:
 *        - Users
 */
router.get("/getList", async function (req, res, next) {
  const data = await getList();

  if (data) {
    res.send(data);
  }

  res.send("respond with a resource");
});

const getList = async () => {
  return new Promise((resolve) => {
    const data = userModel.find();

    resolve(data);
  });
};

module.exports = router;
