const categoryController = require("../controller/categoryController");

const router = require("express").Router();

//get category
router.get("/", categoryController.getAllCategory);

module.exports = router;