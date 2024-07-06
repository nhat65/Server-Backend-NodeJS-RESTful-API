const { User, Role } = require("../model/userModel");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const cryto = require("crypto");
const jwt = require("jsonwebtoken");
const JWT_SECRET = cryto.randomBytes(64).toString("hex");

const authenController = {
    login: async (req, res) => {
        try {
            const { phone_number, password } = req.body;
            const oldUser = await User.findOne({ phone_number: phone_number }).populate("role", "permissions");
            if (!oldUser) {
                return res.send({ status: "error", data: "User does not exist!!!" });
            }

            if (await bcrypt.compare(password, oldUser.password)) {
                const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);

                return res.send({ status: "ok", data: token, id: oldUser._id , role: oldUser.role});
            } else {
                return res.send({ error: "error", data: "Invalid password!!!" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    signup: async (req, res) => {
        const { email, phone_number, password } = req.body;

        const oldUser = await User.findOne({ email: email });
        if (oldUser) {
            return res.send({ data: "User already exists!!!" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        try {
            const newUser = new User({
                email: email,
                phone_number: phone_number,
                password: encryptedPassword
            });
            const saveUser = await newUser.save();

            if (newUser) {
                const role = Role.findById("664abab3abf26e247ea43fc5");
                await role.updateOne({ $push: { users: saveUser._id } });

                const filter = { _id: saveUser._id };
                const update = { $set: { role: [new mongoose.Types.ObjectId("664abab3abf26e247ea43fc5")] } };

                await User.updateOne(filter, update);
            }

            res.send({ status: "ok", data: "User created successfully!" });
        } catch (error) {
            res.send({ status: "error", data: {error: error.message} });
        }
    }
};

module.exports = authenController;