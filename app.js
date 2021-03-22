let express = require('express');
let app = express();
app.set('view engine', 'ejs');

//routes required
let aboutus = require('./routes/AboutUs');
let login = require('./routes/LogIn');
let register = require('./routes/Register');
let catalog = require('./routes/Catalog');
let cart = require('./routes/Cart');
let profile = require('./routes/Profile.js');


let port = process.env.PORT || 3000;

//static files
app.use(express.static('assets'))
app.use('/css', express.static(__dirname + 'assets/css'))
app.use('/imgs', express.static(__dirname + 'assets/imgs'))

app.get("/", (req,res)=>{
    res.render("home")
})

app.use('/about', aboutus);
app.use('/login', login);
app.use('/register', register);
app.use('/catalog', catalog);
app.use('/cart', cart);
app.use('/profile', profile);

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
})
