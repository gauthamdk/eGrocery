let express = require("express");
let router = express.Router();
const Product = require("../models/Product");

router.get("/:productid", (req, res) => {
  Product.findById(req.params.productid, (err, product) => {
    res.render("editproduct", { product: product });
  });
});

router.put("/:productid", (req, res) => {
  const newdetails = {
    name: req.body.name,
    price: req.body.price,
    details: req.body.details,
    stock: req.body.stock,
    category: req.body.category,
    image_url: req.body.image,
  };
  console.log(newdetails);

  Product.findByIdAndUpdate(
    req.params.productid,
    newdetails,
    (err, updatedProduct) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated the product");
        res.redirect("/catalog/product/" + updatedProduct._id);
      }
    }
  );
});

module.exports = router;
