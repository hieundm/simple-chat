const express = require("express");
const router = express.Router();
const responseCode = require("../constants/response-code");
const { User } = require("../models/user");
const { hashPassword, validateEmail } = require("../helpers/crypto");
const { randomString } = require("../helpers/Utils");

/**
 * @swagger
 * /account/forgot-password:
 *  post:
 *    description: change password
 *    parameters:
 *       - name: email
 *         description: Email to use for change password.
 *         required: true
 *         in: formData
 *         type: string
 *       - name: newPassword
 *         description: new password.
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
 *        - Account
 */
router.post("/forgot-password", async (req, res) => {
	await global.manipulate(async (responseData) => {
		const { email, newPassword } = req.body;

		const user = await User.findOne({ email: email });

		if (!user) {
			responseData.code = responseCode.forbidden.value;
			responseData.message = responseCode.forbidden.description;
			res.send(responseData);

			return;
		}

		const newHashedPassword = hashPassword(newPassword, user.salt);

		try {
			user.password = newHashedPassword;

			user.save();
		} catch (error) {
			responseData.code = responseCode.failed.value;
			responseData.message = responseCode.failed.description;

			res.send(error);
		}

		responseData.code = responseCode.success.value;
		responseData.message = responseCode.success.description;

		res.send(responseData);
	});
});

/**
 * @swagger
 * /account/register:
 *  post:
 *    description: change password
 *    parameters:
 *       - name: body
 *         in: body
 *         description: User's information.
 *         schema:
 *             type: object
 *             required:
 *                  - firstname
 *                  - lastname
 *                  - email
 *                  - password
 *             properties:
 *                  firstname:
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  company:
 *                      type: string
 *                  address:
 *                      type: string
 *                  phone1:
 *                      type: string
 *                  city:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
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
 *        - Account
 */
router.post("/register", async (req, res) => {
	await global.manipulate(async (responseData) => {
		const {
			first_name,
			last_name,
			company,
			address,
			city,
			phone1,
			email,
			password,
		} = req.body;

		if (
			!first_name ||
			first_name.length < 1 ||
			!last_name ||
			last_name.length < 1 ||
			!password ||
			password.length < 1 ||
			validateEmail(email) === false
		) {
			responseData.code = responseCode.invalidParam.value;
			responseData.message = responseCode.invalidParam.description;

			res.send(responseData);

			return;
		}

		const existedUser = User.findOne({ email: email });

		if (existedUser) {
			responseData.code = responseCode.failed.value;
			responseData.message =
				"This email existed, please use another email to register";

			res.send(responseData);

			return;
		}

		const salt = randomString(8);

		const hashedPassword = hashPassword(password, salt);

		await User.create({
			first_name,
			last_name,
			company_name: company,
			address,
			city,
			phone1,
			email,
			salt,
			password: hashedPassword,
		});

		const newUser = await User.findOne({ email: email });

		responseData.code = responseCode.success.value;
		responseData.message = responseCode.success.description;
		responseData.data = newUser;

		res.send(responseData);
	});
});

module.exports = router;
