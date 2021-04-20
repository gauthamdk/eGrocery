const connectEnsureLogin = require("connect-ensure-login");
let express = require("express");
let router = express.Router();
const Product = require("../models/Product");

router.delete(
  "/:productid",
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => {
    Product.findByIdAndDelete(req.params.productid, (err) => {
      if (err) {
        console.log(err);
        req.flash("error", "Error deleting product");
        res.redirect("/catalog");
      } else {
        console.log("deleted");
        req.flash("success", "Deleted product");
        res.redirect("/catalog");
      }
    });
  }
);

module.exports = router;
