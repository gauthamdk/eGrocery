let express = require("express");
let router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");
const User = require("../models/User");
const Product = require("../models/Product");

router.get("/", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  User.findById(req.user._id, (err, user) => {
    const cart = user.cart;

    let user_cart = [];
    let n = cart.length;

    for (let i = 0; i < n; i++) {
      let product_info = {};
      let product = Product.findById(cart[i].product_id).exec((err, item) => {
        // product_info.name = item.name;
        // product_info.price = item.price;
        // product_info.image = item.image_url;
      });

      console.log(product);
      // product_info.count = cart[i].count;
      // user_cart.push(product_info);
      // console.log(product_info);
    }

    res.render("cart", { cart: user_cart });
  });
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
        } else {
          console.log("Added to cart");
        }
      }
    );
    res.redirect("/cart");
  }
);

module.exports = router;
