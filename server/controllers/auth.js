const config = require("../appsetting");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const utils = require("../helpers/Utils");
const connection = require("../connection/Connection");
const { manipulate } = require("../helpers/FunctionBase");
const validateCode = require("../constants/auth/ValidateCode");
const responseCode = require("../constants/ResponseCode");
const { hashPassword, validateEmail } = require("../business/Crypto");

connection.once("open", function () {});

const userModel = require("../models/User");

/**
 * @swagger
 * /auth:
 *  post:
 *    description: authenticate user
 *    parameters:
 *       - name: email
 *         description: Email to use for login.
 *         required: true
 *         in: formData
 *         type: string
 *       - name: password
 *         description: User's password.
 *         required: true
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
 *        - Auth
 */
router.post("/", async function (req, res) {
  manipulate(async (responseData) => {
    const { email, password } = req.body;

    const code = validateAuthRequest(email, password);

    if (code !== validateCode.OK) {
      res.send(responseData);

      return;
    }

    const query = userModel.where({ email: email });

    if (query) {
      const data = await query.findOne();

      const hashedPasswordWithSalt = hashPassword(password, data.salt);

      if (hashedPasswordWithSalt !== data.password) {
        responseData.data = "Fail";
      } else {
        const displayName = utils.getDisplayName(
          data.first_name,
          data.last_name
        );

        const token = jwt.sign(
          {
            sub: data.email,
            name: displayName,
          },
          config.privateKey,
          { expiresIn: "7d" }
        );

        responseData.data = {
          name: displayName,
          token: token,
        };
      }
    }

    responseData.code = responseCode.success.value;

    responseData.message = responseCode.success.description;

    res.send(responseData);
  });
});

const validateAuthRequest = (email, password) => {
  if (!email || email.length < 1 || !password || password.length < 1) {
    return validateCode.ANY_EMPTY;
  } else if (validateEmail(email) === false) {
    return validateCode.INVALID_EMAIL;
  }
  return validateCode.OK;
};

module.exports = router;
