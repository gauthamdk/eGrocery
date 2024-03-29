const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserDetail = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  phone_no: String,
  address: String,
  payment_method: String,
  cart: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      count: { type: Number, default: 0 },
    },
  ],
  admin: Boolean,
});

UserDetail.plugin(passportLocalMongoose);
module.exports = mongoose.model("userInfo", UserDetail);
