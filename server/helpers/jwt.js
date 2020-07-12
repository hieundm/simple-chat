const expressJwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");

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
    ],
  });
};

exports.default = jwt;

exports.authenticateJWT = authenticateJWT;
