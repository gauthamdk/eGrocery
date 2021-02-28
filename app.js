let express = require('express');
let app = express();
app.set('view engine', 'ejs');

let port = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.render("home")
})

app.listen(port, ()=>{
    console.log("App running on port" + port);
})
