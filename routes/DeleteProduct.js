let express = require("express");
let router = express.Router();
const Product = require("../models/Product");

router.delete("/:productid", (req, res) => {
  Product.findByIdAndDelete(req.params.productid);
});

module.exports = router;
