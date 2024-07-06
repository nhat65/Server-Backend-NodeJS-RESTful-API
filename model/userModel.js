const mongoose = require("mongoose");


const roleSchema = new mongoose.Schema({
  permissions: {
    type: String,
    required: true
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  gender: {
    type: String
  },
  address: {
    type: String
  },
  date_of_birth: {
    type: Date
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date
  }
});

userSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

let User = mongoose.model('User', userSchema);
let Role = mongoose.model('Role', roleSchema);

module.exports = { User, Role };