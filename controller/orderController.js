const Order = require("../model/orderModel");
const Cart= require("../model/cartModel")

const orderController = {
    getOrderHistory: async(req,res)=>{
        try {
            const order = await Order.find({customer: req.params.id}).populate("cartList.product");
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    payOrder: async(req,res) => {
        try {
            const newOrder = new Order({
                customer: req.body.customer,
                cartList: req.body.cartList,
                totalAmount: req.body.totalAmount
              });
            await newOrder.save()
            await Cart.deleteMany({user: req.params.id})
            res.status(200).json(newOrder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};

module.exports = orderController;