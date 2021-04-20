let express = require("express");
const Product = require("../models/Product");
let router = express.Router();
let Products = require("../models/Product");

router.get("/:id", (req, res) => {
  Products.findById(req.params.id).exec((err, product) => {
    if (err) {
      console.log(err);
    } else {
      res.render("product", { product: product });
    }
  });
});

router.post("/add", (req, res) => {
  const new_product = {
    name: req.body.name,
    price: req.body.price,
    details: req.body.details,
    stock: req.body.stock,
    category: req.body.category,
    image_url: req.body.image_url,
  };

  Products.create(new_product, (err, new_product) => {
    if (err) {
      console.log(err);
      req.flash("error", "Error adding product");
      res.redirect("/catalog");
    } else {
      console.log("New product added");
      req.flash("success", `${new_product.name} added to catalog`);
      res.redirect("/catalog");
    }
  });
});

router.put("/:id/edit", (req, res) => {
  const new_product = {
    name: req.body.name,
    price: req.body.price,
    details: req.body.details,
    stock: req.body.stock,
    category: req.body.category,
    image_url: req.body.image_url,
  };

  Products.findByIdAndUpdate(
    req.params.id,
    new_product,
    (err, updated_prod) => {
      if (err) {
        console.log(err);
        req.flash("error", "Error editing product");
        res.redirect("/catalog");
      } else {
        req.flash("success", `${updated_prod.name} is updated`);
        res.redirect("/catalog");
      }
    }
  );
});

router.delete("/:id/delete", (req, res) => {
  Products.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.log(err);
      req.flash("error", "Error deleting product");
      res.redirect("/catalog");
    } else {
      console.log("Product deleted successfully");
      req.flash("success", "Product deleted");
      res.redirect("/catalog");
    }
  });
});

module.exports = router;
