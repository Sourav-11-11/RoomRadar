require ("dotenv").config();
const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const MONGO_URL= process.env.ATLAS_URL;

main()
    .then(() => {
        console.log("Connected to MongoDB");
        return initDB();
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({}); // Clear existing listings
    await Review.deleteMany({}); // Clear existing reviews
    
    const listings = await Listing.insertMany(initData.data); // Insert listings
    console.log(`Inserted ${listings.length} listings`);

    // Map reviews to listings
    const listingIds = listings.map(l => l._id);
    const reviewsPerListing = 3; // 3 reviews per listing
    let reviewIndex = 0;

    for (let i = 0; i < listings.length; i++) {
        const reviewIds = [];
        for (let j = 0; j < reviewsPerListing; j++) {
            if (reviewIndex < initData.reviews.length) {
                const newReview = new Review(initData.reviews[reviewIndex]);
                await newReview.save();
                reviewIds.push(newReview._id);
                reviewIndex++;
            }
        }
        // Update listing with review IDs
        await Listing.findByIdAndUpdate(listingIds[i], { reviews: reviewIds });
    }

    console.log("Database initialized with sample data and reviews");}