const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');

router.get('/', (req, res) => {
  res.render("login");
})

router.post('/', (req, res, next) => {
  passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.redirect('/');
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        return res.redirect('/catalog');
      });

    })(req, res, next);
});

module.exports = router;