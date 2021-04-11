let express = require('express');
let router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

router.get('/:id/cart', connectEnsureLogin.ensureLoggedIn(),(req,res)=>{
    res.send("Cart page");
})

router.post('/:id', (req, res) => {

}
)

module.exports = router;
