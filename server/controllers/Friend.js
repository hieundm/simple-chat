const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mapper = require("../AutoMapper");
const Get = require("../models/user/Get");
const connection = require("../connection/connection");
const { manipulate } = require("../helpers/FunctionBase");
const responseCode = require("../constants/ResponseCode");
const { validateEmail } = require("../business/Crypto");
const getList = require("../models/shared/GetList");
const rpFriend = require("../repositories/Friend");
const rpUser = require("../repositories/User");
connection.once("open", function () {});

/**
 * @swagger
 * /friend/find:
 *  post:
 *    description: Find friend with phone or email
 *    parameters:
 *       - name: email
 *         description: Email to use for finding friend.
 *         in: formData
 *         type: string
 *       - name: phone
 *         description: Phone to use for finding friend.
 *         in: formData
 *         type: string
 *    responses:
 *      "200":
 *        description: OK
 *        content:
 *           application/json:
 *            schema:
 *            type: object
 *            properties:
 *              code:
 *                type: integer
 *                description: response code
 *              message:
 *                type: string
 *                description: response message
 *              data:
 *                type: object
 *                description: response data
 *    tags:
 *        - Friend
 */
router.post("/find", async (req, res) => {
  await manipulate(async (responseData) => {
    const { email, phone, lastUserId } = req.body;

    if ((!email && !phone) || (email && validateEmail(email) === false)) {
      responseData.code = responseCode.invalidParam.value;
      responseData.message = responseCode.invalidParam.description;

      res.send(responseData);

      return;
    }

    let users;
    let query = {
      $and: [
        { $or: [{ email: email }, { phone1: phone }] },
        { is_active: true },
      ],
    };

    if (lastUserId) {
      query.$and.push({
        $gt: mongoose.Types.ObjectId(lastUserId),
      });
    }

    users = await rpUser
      .find(query)
      .select({ first_name: 1, _id: 1, last_name: 1 });

    const temp = [];
    let length = 0;
    try {
      if (users && (length = users.length) > 0) {
        users.forEach((user) => {
          temp.push(mapper(user, "Get"));
        });
      }
    } catch (error) {}

    responseData.code = responseCode.success.value;
    responseData.message = responseCode.success.description;
    responseData.data = getList(length, temp);

    res.send(responseData);
  });
});

/**
 * @swagger
 * /friend/add:
 *  post:
 *    description: Add new friend
 *    parameters:
 *       - name: userId
 *         description: Id of user.
 *         in: formData
 *         type: string
 *    responses:
 *      "200":
 *        description: OK
 *        content:
 *           application/json:
 *            schema:
 *            type: object
 *            properties:
 *              code:
 *                type: integer
 *                description: response code
 *              message:
 *                type: string
 *                description: response message
 *              data:
 *                type: object
 *                description: response data
 *    tags:
 *        - Friend
 */
router.post("/add", async (req, res) => {
  await manipulate(async (responseData) => {
    const { email, phone, lastUserId } = req.body;

    responseData.code = responseCode.success.value;
    responseData.message = responseCode.success.description;

    res.send(responseData);
  });
});

module.exports = router;
