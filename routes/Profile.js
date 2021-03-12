let express = require('express');
let router = express.Router();

router.get('/', (req,res)=>{
    res.send("Profile Page, will be personalized per user");
})

module.exports = router;
