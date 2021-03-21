let express = require('express');
let app = express();

app.use(express.static(__dirname));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

/*  PASSPORT SETUP  */

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

/* MONGOOSE SETUP */

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/userAuth',
  { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  password: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail);

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

const connectEnsureLogin = require("connect-ensure-login")

/* REGISTER SOME USERS */

// UserDetails.register({username:'paul', active: false}, 'paul');
// UserDetails.register({username:'jay', active: false}, 'jay');
// UserDetails.register({username:'roy', active: false}, 'roy');

//routes required
let aboutus = require('./routes/AboutUs');
let login = require('./routes/LogIn');
let register = require('./routes/Register');
let catalog = require('./routes/Catalog');
let cart = require('./routes/Cart');
let profile = require('./routes/Profile');


let port = process.env.PORT || 3000;

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
