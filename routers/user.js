const router=require("express").Router();
const registerController=require("../controllers/users/register")
const loginController=require("../controllers/users/login")
const logoutController=require("../controllers/users/logout")

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/logout").delete(logoutController);

module.exports=router;
