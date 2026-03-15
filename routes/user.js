const express = require("express");
const router = express.Router();
const passport = require("passport");
const WrapAsync = require("../utils/WrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");
const usersController = require("../controllers/users.js");

// Signup routes
router.route("/signup")
  .get(saveRedirectUrl, usersController.renderSignupForm)
  .post(WrapAsync(usersController.signup));

// Login routes
router.route("/login")
  .get(usersController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: "Invalid username or password"
    }),
    WrapAsync(usersController.login)
  );

// Logout route
router.get("/logout", usersController.logout);

module.exports = router;
