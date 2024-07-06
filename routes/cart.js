const cartController = require("../controller/cartController");

const router = require("express").Router();

//add cart
router.post("/add", cartController.addCart);

//get cart
router.get("/:id", cartController.getCart);

//get total cart
router.get("/", cartController.getTotalCart)

//delete cart
router.delete("/delete/:id", cartController.deleteCart);

//update cart
router.put("/update/:id", cartController.updateCart);


router.get("/basic/:id", cartController.getBasicCart);



module.exports = router;