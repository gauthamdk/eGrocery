const { ensureLoggedIn } = require("connect-ensure-login");
let express = require("express");
let router = express.Router();
const Product = require("../models/Product");

router.delete("/:productid", ensureLoggedIn(), (req, res) => {
  Product.findByIdAndDelete(req.params.productid, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted");
      res.redirect("/catalog");
    }
  });
});

module.exports = router;
