let express = require("express");
let router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");
const User = require("../models/User");
const Product = require("../models/Product");
const passport = require("passport");
let ObjectID = require("mongodb").ObjectID;

router.get("/", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  User.findById(req.user._id, async (err, user) => {
    const cart = user.cart;

    let user_cart = [];
    let n = cart.length;

    for (let i = 0; i < n; i++) {
      let product_info = {};
      product_info.id = cart[i].product_id;
      let product = await Product.findById(cart[i].product_id);

      product_info.name = product.name;
      product_info.price = product.price;
      product_info.image = product.image_url;

      product_info.count = cart[i].count;
      user_cart.push(product_info);
    }

    res.render("cart", { cart: user_cart });
  });
});

router.put(
  "/:product_id/add",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    let product = req.params.product_id;

    let user = await User.findById(req.user._id);

    let cart = user.cart;

    n = cart.length;

    if (n != 0) {
      let found = false;
      for (let i = 0; i < n; i++) {
        let id = cart[i].product_id;
        if (id == product) {
          found = true;
          User.updateOne(
            { _id: req.user._id, "cart.product_id": ObjectID(id) },
            { $inc: { "cart.$.count": req.body.quantity } },
            (err, updated) => {
              if (err) {
                console.log(err);
                req.flash("error", "Error adding product to cart");
                res.redirect("/catalog");
              } else {
                console.log("updated");
                req.flash("success", `Added ${product.name} to cart`);
                res.redirect("/cart");
              }
            }
          );
        }
      }

      if (!found) {
        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: { cart: { product_id: product, count: req.body.quantity } },
          },
          (err, docs) => {
            if (err) {
              console.log(err);
              req.flash("error", "Error adding product to cart");
              res.redirect("/catalog");
            } else {
              console.log("Added to cart");
              req.flash("success", `Added ${product.name} to cart`);
              res.redirect("/cart");
            }
          }
        );
      }
    } else {
      User.findByIdAndUpdate(
        req.user._id,
        {
          cart: [
            {
              product_id: product,
              count: req.body.quantity,
            },
          ],
        },
        (err, docs) => {
          if (err) {
            console.log(err);
            req.flash("error", "Error adding product to cart");
            res.redirect("/catalog");
          } else {
            console.log("Added to cart");
            req.flash("success", `Added ${product.name} to cart`);
            res.redirect("/cart");
          }
        }
      );
    }

    res.redirect("/cart");
  }
);

router.put(
  "/:productid/remove",
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => {
    User.updateOne(
      { _id: req.user._id },
      {
        $pull: { cart: { product_id: req.params.productid } },
      },
      (err) => {
        if (err) {
          console.log(err);
          req.flash("error", "Error adding product to cart");
          res.redirect("/catalog");
        } else {
          console.log("Removed from cart");

          req.flash("success", `Removed ${product.name} from cart`);
          res.redirect("/cart");
        }
      }
    );
  }
);

module.exports = router;
