let express = require("express");
let router = express.Router();
let Products = require("../models/Product");

router.get("/", (req, res) => {
  Products.find({}, (err, allProducts) => {
    if (err) {
      console.log(err);
    } else {
      res.render("catalog", { products: allProducts });
    }
  });
});

router.get("/:category", (req, res) => {
  Products.find({ category: req.params.category }, (err, filteredProducts) => {
    if (err) {
      console.log(err);
    } else {
      res.render("catalog", { products: filteredProducts });
    }
  });
});

router.post("/search", (req, res) => {
  keyword = req.body.search_word;

  Products.find(
    { name: { $regex: keyword, $options: "i" } },
    (err, searchProducts) => {
      if (err) {
        console.log(err);
      } else {
        res.render("catalog", { products: searchProducts });
      }
    }
  );
});

module.exports = router;
