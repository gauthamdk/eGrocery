let express = require("express");
let router = express.Router();
const Product = require("../models/Product");
const connectEnsureLogin = require("connect-ensure-login");

router.get("/:productid", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  Product.findById(req.params.productid, (err, product) => {
    res.render("editproduct", { product: product });
  });
});

router.put("/:productid", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  const newdetails = {
    name: req.body.name,
    price: req.body.price,
    details: req.body.details,
    stock: req.body.stock,
    category: req.body.category,
    image_url: req.body.image,
  };

  Product.findByIdAndUpdate(
    req.params.productid,
    newdetails,
    (err, updatedProduct) => {
      if (err) {
        req.flash("error", "Error updating product");
        res.redirect("/catalog");
      } else {
        req.flash("success", "Updated the product");
        res.redirect("/catalog/product/" + updatedProduct._id);
      }
    }
  );
});

module.exports = router;
