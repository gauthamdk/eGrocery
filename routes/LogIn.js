const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res, next) => {
  passport.authenticate(
    "local",

    (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        req.flash("error", "Wrong username or password");
        return res.redirect("/login");
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        } else {
          req.flash("success", "Welcome back " + user.name);
          return res.redirect("/catalog");
        }
      });
    }
  )(req, res, next);
});

module.exports = router;
