let express = require("express");
let router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");
const User = require("../models/User");
const Product = require("../models/Product");

router.get("/", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.send("cart page");
});

router.get("/:id", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.send("Cart page");
});

router.post(
  "/:product_id/add",
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => {
    let product = req.params.product_id;

    User.findByIdAndUpdate(
      req.user._id,
      { cart: [{ product_id: product, count: req.body.quantity }] },
      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added to cart");
        }
      }
    );
    res.redirect("/cart");
  }
);

module.exports = router;
