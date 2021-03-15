let express = require('express');
let router = express.Router();

router.get('/', (req,res)=>{
    res.send("About Us Page");
})

module.exports = router;
