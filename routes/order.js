const orderController = require("../controller/orderController");

const router = require("express").Router();

//get order history
router.get("/:id", orderController.getOrderHistory);
//pay order
router.put("/pay/:id", orderController.payOrder);

module.exports = router;