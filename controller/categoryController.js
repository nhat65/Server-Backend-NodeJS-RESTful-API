const {Product, Category} = require("../model/productModel");

const categoryController = {
    getAllCategory: async(req,res)=>{
        try {
            const category = await Category.find();
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json(error);
        }
    }

};

module.exports = categoryController;