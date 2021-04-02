const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

const UserDetail = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    phone_no: Number,
    address: String,
    payment_method: String,
    cart: [{
      item: String,
      count: Number
    }],
    admin: Boolean
  });

  UserDetail.plugin(passportLocalMongoose);
  module.exports = mongoose.model('userInfo', UserDetail);