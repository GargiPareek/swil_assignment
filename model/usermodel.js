const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique:true , index: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  emailid: { type: String, required: true , unique:true , index: true },
  password: { type: String, required: true },
  phonenumber: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;