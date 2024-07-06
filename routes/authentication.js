const authenController = require("../controller/authenController");

const router = require("express").Router();

//get category
router.post("/login", authenController.login);

router.post("/signup", authenController.signup);

module.exports = router;