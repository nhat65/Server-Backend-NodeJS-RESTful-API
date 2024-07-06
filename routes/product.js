const productController = require("../controller/productController");

const router = require("express").Router();

//post
router.post("/add", productController.addProduct);


//get all product
router.get("/", productController.getAllProduct);

//get a product
router.get("/:id", productController.getProduct);


//update product
router.put("/update/:id", productController.updateProduct);

//delete product
router.delete("/delete/:id", productController.deleteProduct)


module.exports = router;