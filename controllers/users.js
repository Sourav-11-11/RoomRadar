const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("listings/signup");
};

module.exports.signup = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Successfully signed up! Welcome to RoomRadar!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("listings/login");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to RoomRadar!");
    res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success", "You have logged out successfully!");
        res.redirect("/listings");
    });
};
