let express = require("express");
let router = express.Router();
const Product = require("../models/Product");

router.get("/:productid", (req, res) => {
  Product.findById(req.params.productid, (err, product) => {
    res.render("editproduct", { product: product });
  });
});

module.exports = router;
