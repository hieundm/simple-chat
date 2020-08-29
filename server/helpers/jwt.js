const expressJwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const ResponseData = require("../models/shared/response-data");
const ResponseCode = require("../constants/response-code");

const authenticateJWT = (req, res, next) => {
	if (req.headers.authorization) {
		jsonwebtoken.verify(
			req.headers.authorization,
			process.env.PRIVATE_KEY,
			(err, user) => {
				if (err) {
					return res.sendStatus(403);
				}

				req.user = user;
				next();
			}
		);
	} else {
		res.sendStatus(401);
	}
};

const handleUnAuthorize = (err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		const responseData = new ResponseData(
			ResponseCode.unauthorized.value,
			ResponseCode.unauthorized.description
		);
		res.status(200).send(responseData);
	}
};

const jwt = () => {
	return expressJwt({
		secret: process.env.PRIVATE_KEY,
		credentialsRequired: true,
		algorithms: ["HS256"],
		getToken: (req) => {
			if (req.headers.authorization) {
				return req.headers.authorization;
			} else if (req.query && req.query.token) {
				return req.query.token;
			}
			return null;
		},
	}).unless({
		path: [
			"/auth",
			"/account/forgot-password",
			"/account/register",
			/^\/readme/,
			/^\/readme\/.*/,
			/^\/shared\/*/
		],
	});
};

exports.default = jwt;

exports.authenticateJWT = authenticateJWT;

exports.handleUnAuthorize = handleUnAuthorize;
