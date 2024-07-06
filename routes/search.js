const searchController = require("../controller/searchController");

const router = require("express").Router();

//search product
router.get("/", searchController.searchProduct);

module.exports = router;