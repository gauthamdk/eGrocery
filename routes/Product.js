let express = require("express");
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

module.exports = router;
