const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();
const _ = require('lodash');
const connection = require("../connection/connection");
const { manipulate } = require("../helpers/function-base");
const validateCode = require("../constants/auth/validate-code");
const responseCode = require("../constants/response-code");
const { hashPassword, validateEmail } = require("../helpers/crypto");

connection.once("open", function () { });

const User = require("../models/user");

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

		const data = await User.getByEmail(email);

		if (_.isEmpty(data) === true) {
			res.send(responseData);

			return;
		}

		const hashedPasswordWithSalt = hashPassword(password, data.salt);

		if (hashedPasswordWithSalt !== data.password) {
			responseData.data = "Fail";

			res.send(responseData);

			return;
		} else {
			const displayName = User.getDisplayName();

			const token = jwt.sign(
				{
					sub: data.email,
					name: displayName,
				},
				process.env.PRIVATE_KEY,
				{ expiresIn: "7d" }
			);

			await User.updateOne(
				{ _id: mongoose.Types.ObjectId(data.id) },
				{ last_online_at: Date.now(), is_online: true },
				(error, doc) => {
					console.log(error);
				}
			);

			responseData.data = {
				name: displayName,
				email: data.email,
				token: token,
			};
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
