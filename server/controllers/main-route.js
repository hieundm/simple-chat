const express = require("express");
const router = express.Router();
const accountRouter = require("./account");
const authRouter = require("./auth");
const indexRouter = require("./index");
const usersRouter = require("./users");
const friendRouter = require("./friend");

router.use("/account", accountRouter);
router.use("/", indexRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/friend", friendRouter);

module.exports = router;
