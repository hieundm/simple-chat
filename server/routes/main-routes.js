const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const indexRouter = require("./index");
const usersRouter = require("./users");

router.use("/", indexRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);

module.exports = router;
