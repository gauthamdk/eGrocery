let express = require("express");
const Product = require("../models/Product");
let router = express.Router();

router.get("/", (req, res) => {
  res.render("addproduct");
});

router.post("/", (req, res) => {
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
    } else {
      console.log("product added");
    }
  });

  res.redirect("/catalog");
});

module.exports = router;
