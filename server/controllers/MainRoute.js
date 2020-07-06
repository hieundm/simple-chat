const express = require("express");
const router = express.Router();
const accountRouter = require("./Account");
const authRouter = require("./Auth");
const indexRouter = require("./Index");
const usersRouter = require("./Users");
const friendRouter = require("./Friend");

router.use("/account", accountRouter);
router.use("/", indexRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/friend", friendRouter);

module.exports = router;
