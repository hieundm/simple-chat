const express = require("express");
const router = express.Router();
const connection = require("../connection/connection");
const { manipulate } = require("../helpers/functionBase");
const responseCode = require("../constants/responseCode");

connection.once("open", function () { });

const userModel = require("../models/user");
const { hashPassword } = require("../business/crypto");


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
router.post("/register", async (req) => {
    await manipulate(() => {


    });
})

module.exports = router;