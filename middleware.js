const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const WrapAsync = require("./utils/WrapAsync.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create or edit a listing.");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.checkListingExists = WrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    req.listing = listing; // Store listing in request for next middleware
    next();
});

module.exports.isOwner = (req, res, next) => {
    // Check if current user is the owner
    if (!req.listing.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission to edit this listing");
        return res.redirect("/listings");
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

module.exports.checkReviewExists = WrapAsync(async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect("/listings");
    }
    req.review = review; // Store review in request for next middleware
    next();
});

module.exports.isReviewAuthor = (req, res, next) => {
    // Check if current user is the review author
    if (!req.review.author.equals(req.user._id)) {
        req.flash("error", "You don't have permission to delete this review");
        return res.redirect("back");
    }
    next();
};  