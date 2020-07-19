const _ = require("lodash"),
	express = require("express"),
	router = express.Router(),
	mongoose = require("mongoose"),
	mapper = require("../AutoMapper"),
	connection = require("../connection/connection"),
	{ manipulate } = require("../helpers/function-base"),
	responseCode = require("../constants/response-code"),
	{ validateEmail } = require("../helpers/crypto"),
	getList = require("../models/shared/get-list"),
	Friend = require("../models/friend"),
	FriendRequest = require("../models/friend-request"),
	User = require("../models/user"),
	{ authenticateJWT } = require("../helpers/jwt");
connection.once("open", function () { });

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
 *                type: str.ing
 *                description: response message
 *              data:
 *                type: object
 *                description: response data
 *    tags:
 *        - Friend
 */
router.post("/find", authenticateJWT, async (req, res) => {
	await manipulate(async responseData => {
		const { email, phone, lastUserId } = req.body;

		if (req.user.sub === email) {
			responseData.code = responseCode.success.value;
			responseData.message = responseCode.success.description;
			responseData.data = getList(0, []);

			res.send(responseData);

			return;
		}

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

		users = await User.instance().find(query).select({
			first_name: 1,
			_id: 1,
			last_name: 1,
		});

		const temp = [];
		let length = 0;
		try {
			if (users && (length = users.length) > 0) {
				users.forEach(user => {
					temp.push(mapper(user, "Get"));
				});
			}
		} catch (error) { }

		responseData.code = responseCode.success.value;
		responseData.message = responseCode.success.description;
		responseData.data = getList(length, temp);

		res.send(responseData);
	});
});

/**
 * @swagger
 * /friend/send-request:
 *  post:
 *    description: Send request to add friend
 *    parameters:
 *       - name: toUserId
 *         description: Id of user want to add.
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
 *        - Friend
 */
router.post("/send-request", authenticateJWT, async (req, res) => {
	await manipulate(async responseData => {
		const { sub } = req.user;
		const { toUserId } = req.body;

		if (!sub) {
			responseData.code = responseCode.invalidParam.value;
			responseData.message = responseCode.invalidParam.description;

			res.send(responseData);

			return;
		}

		responseData.code = responseCode.success.value;
		responseData.message = responseCode.success.description;

		const user = await User.findOne({ email: sub });

		if (!user || !toUserId) {
			responseData.code = responseCode.invalidParam.value;
			responseData.message = responseCode.invalidParam.description;

			res.send(responseData);

			return;
		}

		const newFriend = new FriendRequest({
			from_user_id: user.id,
			to_user_id: toUserId,
		});

		newFriend.save(error => {
			if (error) {
				responseData.code = responseCode.failed.value;
				responseData.message = responseCode.failed.description;
			}
		});

		res.send(responseData);
	});
});

/**
 * @swagger
 * /friend/list:
 *  get:
 *    description: Get your friend list
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
router.get("/list", authenticateJWT, async (req, res) => {
	await manipulate(async responseData => {
		const { sub } = req.user;

		if (!sub) {
			responseData.code = responseCode.invalidParam.value;
			responseData.message = responseCode.invalidParam.description;

			res.send(responseData);

			return;
		}

		responseData.code = responseCode.success.value;
		responseData.message = responseCode.success.description;

		const user = await User.instance().findOne({ email: sub });

		if (!user) {
			responseData.code = responseCode.invalidParam.value;
			responseData.message = responseCode.invalidParam.description;

			res.send(responseData);

			return;
		}

		const lstFriendRequest = await FriendRequest.getListByReceiverId(user.id);

		if (!lstFriendRequest || lstFriendRequest.length < 1) {
			res.send(responseData);

			return;
		}

		const lstUser = await User.getUserListByIds(
			lstFriendRequest.map(x => x.sender_id).join(","),
			{ first_name: 1, last_name: 1, avatar: 1 }
		);

		if (!lstUser || lstUser.length < 1) {
			res.send(responseData);

			return;
		}

		const temp = [];

		lstUser.forEach(user => {
			for (
				let index = 0, length = lstFriendRequest.length;
				index < length;
				index++
			) {
				if (_.isEqual(user.id, lstFriendRequest[index].sender_id.toString()) === true) {
					user.is_success = lstFriendRequest[index].is_success;
					user.is_deleted = lstFriendRequest[index].is_deleted;

					temp.push(mapper(user, "friend-request"));

					break;
				}
			}
		});

		responseData.data = temp;

		res.send(responseData);
	});
});

module.exports = router;
