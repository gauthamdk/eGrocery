let express = require('express');
let router = express.Router();
// const connectEnsureLogin = require("connect-ensure-login");

router.get('/', (req,res)=>{
    // connectEnsureLogin.ensureLoggedIn(),
    res.send("Catalog");
})

module.exports = router;
