const userController = require("../controller/userController");
const roleController = require("../controller/roleController");

const router = require("express").Router();

//post
router.post("/add", userController.addUser);
router.post("/role", roleController.addRole);

//get all user
router.get("/", userController.getAllUser);

//get an user
router.get("/:id", userController.getUser)

//update user
router.put("/update/:id", userController.updateUser);

//delete user
router.delete("/delete/:id", userController.deleteUser)

module.exports = router;