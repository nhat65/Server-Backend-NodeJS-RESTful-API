const {Product, Category} = require("../model/productModel");

const searchController = {
    searchProduct: async(req,res)=>{
        try {
            const product = await Product.find({ name: { $regex: req.query.name } })
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

};

module.exports = searchController;