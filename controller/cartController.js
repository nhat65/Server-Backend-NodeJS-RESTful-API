const Cart = require("../model/cartModel");


const cartController = {
    //add cart
    addCart: async (req, res) => {
        try {
            const cart = await Cart.findOne({ user: req.body.user, product: req.body.product });
            let count
            let index
            if (cart) {
                const priceItem = cart.prices.find(item => item.size == req.body.prices.size);
                index = cart.prices.findIndex(price => price.size == req.body.prices.size);
                if (priceItem != undefined) {
                    const Quantity = cart.prices[index].quantity + req.body.prices.quantity;
                    const Price = Quantity * req.body.prices.price
                    const Size = req.body.prices.size

                    priceItem.price = Price;
                    priceItem.quantity = Quantity;
                    await cart.save();

                    count = 1
                } else {
                    const Price = req.body.prices.price * req.body.prices.quantity;
                    const Size = req.body.prices.size
                    const Quantity = req.body.prices.quantity
                    cart.prices.push({
                        size: Size,
                        price: Price,
                        quantity: Quantity
                    });
                    await cart.save();
                    count = 2
                }
            } else {
                const Price = req.body.prices.price * req.body.prices.quantity;
                const Size = req.body.prices.size
                const cart = new Cart({ user: req.body.user, product: req.body.product, prices: { price: Price, size: Size, quantity: req.body.prices.quantity } });
                await cart.save();
                count = 3
            }

            // let b = a * req.body.prices.price
            // let c = req.body.prices.size
            // let d = cart.prices.find(item => item.size == req.body.prices.size);
            res.status(200).json(count)

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
    deleteCart: async (req, res) => {
        try {
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted successfuly");
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getCart: async (req, res) => {
        try {
            const cart = await Cart.find({ user: req.params.id }).populate("product").populate("prices");
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getBasicCart: async (req, res) => {
        try {
            const cart = await Cart.find({ user: req.params.id }).populate("prices");
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateCart: async (req, res) => {
        try {
            const product = await Cart.findById(req.params.id);
            const action = req.body.action;
            if (product) {
                const priceItem = product.prices.find(item => item.size == req.body.prices.size);
                index = product.prices.findIndex(price => price.size == req.body.prices.size);
                if (action == "plus") {
                    const initPrice = Math.round((req.body.prices.price / req.body.prices.quantity) * 100) / 100;

                    const Quantity = req.body.prices.quantity + 1;
                    const Price = initPrice * Quantity;
                    const Size = req.body.prices.size

                    priceItem.price = Price;
                    priceItem.quantity = Quantity;
                    await product.save();
                }
                if (action == "minus") {
                    const initPrice = Math.round((req.body.prices.price / req.body.prices.quantity) * 100) / 100;
                    const Quantity = req.body.prices.quantity - 1;
                    const Price = initPrice * Quantity;
                    const Size = req.body.prices.size
                    if (product.prices.length <= 1){
                        if (Quantity <= 0) {
                            await Cart.findByIdAndDelete(req.params.id)
                        } else {
                            priceItem.price = Price;
                            priceItem.quantity = Quantity;
                            await product.save();
                        }
                    }else{
                        if (Quantity <= 0) {
                            await product.updateOne({$pull: {prices: {size: Size}}})
                        } else {
                            priceItem.price = Price;
                            priceItem.quantity = Quantity;
                            await product.save();
                        }
                        
                    }
                    
                }
            }
            res.status(200).json("Update successfully!!!")
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    getTotalCart: async (req, res) => {
        try {
            const aggregateResult = await Cart.aggregate([
                { $unwind: '$prices' },
                {
                    $group: {
                        _id: null,
                        totalPrice: { $sum: '$prices.price' },
                        totalQuantity: { $sum: '$prices.quantity' }
                    }
                }
            ]);

            const totalCart = {
                price: aggregateResult[0].totalPrice,
                totalQuantity: aggregateResult[0].totalQuantity
            };
            res.status(200).json(totalCart)
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = cartController;

