const config = require("../appsetting");
const expressJwt = require("express-jwt");

const jwt = () => {
  const { privateKey } = config;
  return expressJwt({
    secret: privateKey,
    credentialsRequired: true,
    getToken: (req) => {
      if (req.headers.authorization) {
        return req.headers.authorization;
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  }).unless({
    path: ["/auth", /^\/readme\/index\/.*/, /^\/swagger-themes\/.*/],
  });
};

module.exports = jwt;
