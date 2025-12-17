const router = require("express").Router();
const wrapAsync = require('../uitl/wrapAsync')
const registerController = require("../controllers/users/register")
const loginController = require("../controllers/users/login")
const logoutController = require("../controllers/users/logout")

router.route("/register").post(wrapAsync(registerController));
router.route("/login").post(wrapAsync(loginController));
router.route("/logout").delete(logoutController);

module.exports = router;
