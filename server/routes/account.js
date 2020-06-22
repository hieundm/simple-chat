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

connection.once("open", function () { });

const userModel = require("../models/user");
const { hashPassword } = require("../business/crypto");

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

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
 *       - name: password
 *         description: old password.
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
    await manipulate(async (responseData) => {
        const { email, password, newPassword } = req.body;

        const user = await userModel.findOne({ email: email });

        if (!user) {
            responseData.code = responseCode.forbidden.value;
            responseData.message = responseCode.forbidden.description;
            res.send(responseData);

            return;
        }

        const hashedPassword = hashPassword(password, user.salt);

        if (hashedPassword !== user.password) {
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
 *       - name: firstname
 *         description: Firstname of user.
 *         required: false
 *         in: formData
 *         type: string
 *       - name: lastname
 *         description: Lastname of user.
 *         required: false
 *         in: formData
 *         type: string
 *       - name: company
 *         description: Company.
 *         required: false
 *         in: formData
 *         type: string
 *       - name: address
 *         description: Address.
 *         required: false
 *         in: formData
 *         type: string
 *       - name: city
 *         description: City.
 *         required: false
 *         in: formData
 *         type: string
 *       - name: phone1
 *         description: Phone.
 *         required: false
 *         in: formData
 *         type: string
 *       - name: email
 *         description: Email to use for change password.
 *         required: true
 *         in: formData
 *         type: string
 *       - name: password
 *         description: password.
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
router.post("/register", async (req, res) => {
    await manipulate((responseData) => {
        const { firstname, lastname, company, address, city, phone1, email, password } = req.body;


    });
})

module.exports = router;