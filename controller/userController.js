const { default: mongoose } = require("mongoose");
const { User, Role } = require("../model/userModel");

const userController = {
    //add user
    addUser: async (req, res) => {
        try {
            const newUser = new User(req.body);
            const saveUser = await newUser.save();

            if (newUser) {
                const role = Role.findById("664abab3abf26e247ea43fc5");
                await role.updateOne({ $push: { users: saveUser._id } });

                const filter = { _id: saveUser._id };
                const update = { $set: { role: [new mongoose.Types.ObjectId("664abab3abf26e247ea43fc5")] } };

                await User.updateOne(filter, update);
            }
            res.status(200).json(saveUser);
        } catch (error) {
            res.status(500).json({ error: error.message });

        }
    },
    getAllUser: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate("role", "permissions");
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            await user.updateOne({ $set: req.body });
            res.status(200).json("Updated successfuly!!")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Role.updateMany(
                { users: req.params.id },
                { $pull: { users: req.params.id } }
            );
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted successfuly");
        } catch (error) {
            res.status(500).json(error)
        }
    }
};

module.exports = userController;