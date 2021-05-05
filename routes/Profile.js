let express = require("express");
let router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");
const User = require("../models/User");
const Product = require("../models/Product");
const passport = require("passport");
let ObjectID = require("mongodb").ObjectID;
const { update } = require("../models/User");

router.get("/:userid", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  User.findById(req.params.userid, async (err, user) => {
    res.render("userprofile", { user: user, title: "profile" });
  });
});

router.put("/:userid", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  console.log(req.body);
  const newdetails = {
    name: req.body.name,
    email: req.body.email,
    phone_no: req.body.phone,
    address: req.body.address,
    payment_method: req.body.payment,
  };

  User.findByIdAndUpdate(req.params.userid, newdetails, (err, updatedUser) => {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Saved details");
      console.log("Saved details");
      res.redirect("/profile/" + updatedUser._id);
    }
  });
});

module.exports = router;
