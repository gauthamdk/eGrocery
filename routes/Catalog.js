let express = require('express');
let router = express.Router();
let Products = require('../models/Product');

router.get('/', (req, res) => {

  Products.find({}, (err, allProducts) =>{
    if (err){
      console.log(err)
    }

    else{
      res.render('catalog', {products: allProducts})
    }
  })
}
)

module.exports = router;
