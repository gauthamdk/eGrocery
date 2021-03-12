let express = require('express');
let router = express.Router();

router.get('/', (req,res)=>{
    res.send("Cart page");
})

module.exports = router;
