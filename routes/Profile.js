let express = require("express");
let router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");
const User = require("../models/User");
const Product = require("../models/Product");
const passport = require("passport");
let ObjectID = require("mongodb").ObjectID;

// router.get("/", (req, res) => {
//   res.render("userprofile");
// });

router.get("/:userid", connectEnsureLogin.ensureLoggedIn(),(req, res) => {
  User.findById(req.params.userid, async (err, user) => {
    // const name = user.name;
    // const email = user.email;
    // const phone_no = user.phone_no;
    // const address = user.address;
    // const payment_method = user.payment_method;
    res.render("userprofile", {user: user});
  });
});

router.put("/:userid", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  const newdetails = {
    name: req.body.name,
    email: req.body.email,
    phone_no: req.body.phone_no,
    address: req.body.address,
    payment_method: req.body.payment_method,
  };

  User.findByIdAndUpdate(
    req.params.userid,
    newdetails,
    (err, updatedUser) => {
      if (err) {
        console.log(err);
      } else {
        //req.flash("success", "Saved details");
        console.log("Saved details");

      }
    }
  );
});


module.exports = router;
