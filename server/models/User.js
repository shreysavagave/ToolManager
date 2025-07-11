const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username :{
    type: String,
    required :true,
  },
  email :{
    type: String,
    required :true,
    unique : true,
  },
  password :{
    type: String,
    required :true,
  },
  role:{
    type: String,
    default : "admin",
  }
})

const User = mongoose.model("user", UserSchema);
module.exports = User;