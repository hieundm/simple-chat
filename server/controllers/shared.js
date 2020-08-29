const
    _ = require("lodash"),
    express = require("express"),
    router = express.Router(),
    deviceType = require("../constants/device-type");

const { User } = require("../models/user");

/**
 * @swagger
 * /shared/device/type/list:
 *  get:
 *    description: Get all type of device
 *    responses:
 *      "200":
 *        description: A successful response
 *    tags:
 *        - Shared
 */
router.get("/device/type/list", async function (req, res, next) {
    await global.manipulate((responseData) => {
        if (_.isEmpty(deviceType) === true) {
            res.send(responseData);

            return;
        }

        console.log(req);

        responseData.bindResponseCode(global.responseCode.success, deviceType);

        res.send(responseData);
    });
});

module.exports = router;
