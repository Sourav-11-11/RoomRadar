const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn, validateReview, checkReviewExists, isReviewAuthor } = require("../middleware.js");
const reviewsController = require("../controllers/reviews.js");

// Create and read reviews
router.route("/")
  .post(
    isLoggedIn,
    validateReview,
    WrapAsync(reviewsController.create)
  );

// Delete review
router.route("/:reviewId")
  .delete(
    isLoggedIn,
    checkReviewExists,
    isReviewAuthor,
    WrapAsync(reviewsController.destroy)
  );

module.exports = router;
