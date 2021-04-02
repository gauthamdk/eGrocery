let express = require('express');
let router = express.Router();

router.get('/', (req,res)=>{
    res.render("register");
})

router.post('/', (req,res)=>{
    res.send(req.body)
}
)


module.exports = router;
