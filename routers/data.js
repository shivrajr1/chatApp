const router = require("express").Router();
const alluserController = require("../controllers/data/alluser");
const messageController = require("../controllers/data/message");
const wrapAsync = require("../uitl/wrapAsync");

router.route("/alluser").get(wrapAsync(alluserController))
router.route("/message").post(wrapAsync(messageController))

module.exports = router;