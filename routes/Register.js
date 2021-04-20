const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
    }
    passport.authenticate("local")(req, res, () => {
      res.flash("success", "Welcome to eGrocery");
      res.redirect("/catalog");
    });
  });
});

module.exports = router;
