let express = require("express"),
	flash = require("connect-flash"),
	cookieParser = require("cookie-parser"),
	connectEnsureLogin = require("connect-ensure-login");

const app = express();

// MODELS
let UserDetails = require("./models/User");
let Products = require("./models/Product");

// ROUTES
let aboutus = require("./routes/AboutUs");
let login = require("./routes/LogIn");
let register = require("./routes/Register");
let catalog = require("./routes/Catalog");
let cart = require("./routes/Cart");
let profile = require("./routes/Profile");
let product = require("./routes/Product");

app.use(express.static(__dirname));
app.set("view engine", "ejs");

const expressSession = require("express-session")({
	secret: "justanythingrandom4r8934niurw8jADFD",
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 60000 },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession);

/* USING FLASH */

app.use(cookieParser("keyboard cat"));
app.use(flash());

/*  PASSPORT SETUP  */

const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

/* MONGOOSE SETUP */

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/egrocery", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

//let data = require("./catalog.json");

//data.forEach((product) => {
//Products.create(product, (err, product) => {
//if (err) {
//console.log(err);
//}
//});
//});

// PORTS
let port = process.env.PORT || 3000;

//static files
app.use(express.static("assets"));
app.use("/css", express.static(__dirname + "assets/css"));
app.use("/imgs", express.static(__dirname + "assets/imgs"));

app.get("/", (req, res) => {
	res.render("home");
});

app.use("/about", aboutus);
app.use("/login", login);
app.use("/register", register);
app.use("/catalog", catalog);
app.use("/cart", cart);
app.use("/profile", profile);
app.use("/catalog/product", product);

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
