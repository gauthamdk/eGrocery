const connectEnsureLogin = require("connect-ensure-login");
let express = require("express");
const Product = require("../models/Product");
let router = express.Router();

router.get("/", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("addproduct");
});

router.post("/", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    details: req.body.details,
    stock: req.body.stock,
    category: req.body.category,
    image_url: req.body.image,
  };

  Product.create(product, (err, newProduct) => {
    if (err) {
      console.log(err);
      req.flash("error", "Error adding product");
      res.redirect("/catalog");
    } else {
      req.flash("success", "Added product to catalog");
      res.redirect("/catalog");
    }
  });
});

module.exports = router;
