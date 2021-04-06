let express = require('express'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    connectEnsureLogin = require("connect-ensure-login");

const app = express();

// MODELS
let UserDetails = require('./models/User');
let Products = require('./models/Product');

// ROUTES
let aboutus = require('./routes/AboutUs');
let login = require('./routes/LogIn');
let register = require('./routes/Register');
let catalog = require('./routes/Catalog');
let cart = require('./routes/Cart');
let profile = require('./routes/Profile');

app.use(express.static(__dirname));
app.set('view engine', 'ejs');

const expressSession = require('express-session')({
  secret: 'justanythingrandom4r8934niurw8jADFD',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000}
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession);

/* USING FLASH */

app.use(cookieParser('keyboard cat'));
app.use(flash());

/*  PASSPORT SETUP  */

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

/* MONGOOSE SETUP */

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/egrocery',
  { useNewUrlParser: true, useUnifiedTopology: true });

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

data = {    name: 'Orange',
  details: "lorum ipsum",
  stock: 5,
  category: 'Fruits & Vegetables',
  image_url: 'https://images.unsplash.com/photo-1613747495731-3add0988073a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
}

// Products.create(data, (err, product) =>{
//   if (err){
//     console.log(err)
//   }
// })

// PORTS
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
