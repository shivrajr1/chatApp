const router=require("express").Router();
const alluserController=require("../controllers/data/alluser");
const messageController=require("../controllers/data/message")

router.route("/alluser").get(alluserController)
router.route("/message").get(messageController)

module.exports=router;