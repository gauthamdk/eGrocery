let express = require('express');
let router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

router.get('/', 
  (req, res) => {
        res.render('catalog');
    })

module.exports = router;
