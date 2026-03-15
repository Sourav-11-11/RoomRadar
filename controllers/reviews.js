const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { computeReviewComposite, computeRealityScore } = require("../utils/roomRadarMetrics.js");

module.exports.create = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  // Normalize multi-category ratings; legacy single `rating` is preserved.
  const payload = req.body.review || {};
  const newReview = new Review({
    comment: payload.comment,
    foodQuality: payload.foodQuality,
    cleanliness: payload.cleanliness,
    wifi: payload.wifi,
    noise: payload.noise,
    safety: payload.safety,
    ownerBehavior: payload.ownerBehavior,
    rating: payload.rating
  });
  newReview.author = req.user._id; // Set author to current user
  newReview.compositeScore = computeReviewComposite(newReview);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  // Recalculate and cache reality score after each new review.
  const refreshedListing = await Listing.findById(id).populate("reviews");
  const { score, reviewCount } = computeRealityScore(refreshedListing.reviews || []);
  refreshedListing.realityScore = score;
  refreshedListing.reviewCount = reviewCount;
  await refreshedListing.save();

  req.flash("success", "Successfully added a new review!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroy = async (req, res, next) => {
  const { id: listingId, reviewId } = req.params;
  await Listing.findByIdAndUpdate(listingId, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  // Keep reality score in sync after deletion.
  const refreshedListing = await Listing.findById(listingId).populate("reviews");
  if (refreshedListing) {
    const { score, reviewCount } = computeRealityScore(refreshedListing.reviews || []);
    refreshedListing.realityScore = score;
    refreshedListing.reviewCount = reviewCount;
    await refreshedListing.save();
  }

  req.flash("success", "Successfully deleted the review!");
  res.redirect(`/listings/${listingId}`);
};
