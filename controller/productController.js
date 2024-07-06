const {Product, Category} = require("../model/productModel");

const productController = {
    //add prouct
    addProduct: async(req,res)=>{
        try {
            const newProduct = new Product(req.body);
            const save = await newProduct.save();

            if(req.body.category){

                 const cate = await Category.findById(req.body.category);
                 await cate.updateOne({$push: {products: save._id}})
            }
            res.status(200).json(save);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    getAllProduct: async(req,res)=>{
        try {
            const allProduct = await Product.find();
            res.status(200).json(allProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getProduct: async(req,res)=>{
        try {
            const aProduct = await Product.findById(req.params.id);
            res.status(200).json(aProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateProduct: async(req,res) => {
             try {
                const product = await Product.findById(req.params.id);
                await product.updateOne({$set: req.body});
                res.status(200).json("Updated successfuly!!")
             } catch (error) {
                res.status(500).json(error)
             }
    },
    deleteProduct: async(req,res) => {
        try {
            await Category.updateMany(
                {products: req.params.id},
                {$pull: { products: req.params.id}}
            );
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted successfuly");
        } catch (error) {
            res.status(500).json(error)
        }
    }
};

module.exports = productController;