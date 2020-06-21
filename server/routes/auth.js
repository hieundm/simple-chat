const config = require("../appsetting");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const utils = require("../helpers/utils");
const connection = require("../connection/connection");
const { manipulate } = require("../helpers/functionBase");
const validateCode = require("../constants/auth/validateCode");
const responseCode = require("../constants/responseCode");
const md5 = require("md5");

connection.once("open", function () {});

const userModel = require("../models/user");
const { HttpError } = require("http-errors");

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

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

      const hashedPassword = md5(password);

      const hashedPasswordWithSalt = md5(
        `${hashedPassword}${data.salt}`
      ).toUpperCase();

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

const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

module.exports = router;
