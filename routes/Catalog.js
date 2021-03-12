let express = require('express');
let router = express.Router();

router.get('/', (req,res)=>{
    res.send("Catalog");
})

module.exports = router;
