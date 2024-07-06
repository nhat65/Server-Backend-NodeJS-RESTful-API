const {User, Role} = require("../model/userModel");

const roleController = {
    //add user
    addRole: async(req,res)=>{
        try {
            const newRole = new Role(req.body);
            const saveRole = await newRole.save();
            
            res.status(200).json(saveRole);
        } catch (error) {
            res.status(500).json(error);
            
        }
    },
};

module.exports = roleController;