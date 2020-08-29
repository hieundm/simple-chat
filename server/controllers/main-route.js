const
    express = require("express"),
    router = express.Router(),
    accountRouter = require("./account"),
    authRouter = require("./auth"),
    indexRouter = require("./index"),
    usersRouter = require("./users"),
    friendRouter = require("./friend"),
    sharedRouter = require("./shared");

router.use("/account", accountRouter);
router.use("/", indexRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/friend", friendRouter);
router.use("/shared", sharedRouter);

module.exports = router;
