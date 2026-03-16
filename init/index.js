require("dotenv").config();
const mongoose = require("mongoose");
const { listings: seedListings, reviews: seedReviews, users: seedUsers } = require("./data.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");
const { computeTrueMonthlyCost, computeRealityScore } = require("../utils/roomRadarMetrics.js");

const MONGO_URL = process.env.ATLAS_URL;

// Placeholder owner id; replace with a real User _id present in your DB
const DEFAULT_OWNER_ID = "000000000000000000000001";

const cityCoordinates = {
    "HITEC City, Hyderabad": [78.3820, 17.4470],
    "Madhapur, Hyderabad": [78.3960, 17.4410],
    "Kondapur, Hyderabad": [78.3610, 17.4587],
    "SR Nagar, Hyderabad": [78.4360, 17.4415],
    "Jubilee Hills, Hyderabad": [78.4090, 17.4320],
    "Kukatpally JNTU, Hyderabad": [78.4138, 17.4948],
    "Gachibowli / Nanakramguda, Hyderabad": [78.3470, 17.4400],
    "Ameerpet, Hyderabad": [78.4390, 17.4370],
    "Banjara Hills, Hyderabad": [78.4420, 17.4160],
    "Tarnaka, Hyderabad": [78.5450, 17.4290],
    "Miyapur, Hyderabad": [78.3570, 17.4980],
    "KPHB Colony, Hyderabad": [78.3995, 17.4930],
    "Mehdipatnam, Hyderabad": [78.4400, 17.3990],
    "Miyapur Metro, Hyderabad": [78.3590, 17.4970]
};

async function main() {
    try {
        console.log("Seeding database with RoomRadar PG listings, reviews, and users...");
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");

        // Clear existing data
        await Listing.deleteMany({});
        await Review.deleteMany({});
        await User.deleteMany({});
        console.log("Cleared existing listings, reviews, and users");

        // Seed users first
        console.log("Seeding users...");
        const insertedUsers = [];
        for (const userData of seedUsers) {
            const user = new User(userData);
            user.setPassword(userData.password || "password123");
            await user.save();
            insertedUsers.push(user);
        }
        console.log(`Inserted ${insertedUsers.length} users`);

        // Seed listings
        console.log("Seeding listings...");
        const docs = seedListings.map((item) => {
            const coords = cityCoordinates[item.location] || [78.4867, 17.3850];
            const trueMonthlyCost = computeTrueMonthlyCost({
                price: item.price,
                electricityCost: item.electricityCost,
                maintenanceCost: item.maintenanceCost,
                foodIncluded: item.foodIncluded
            });

            return {
                ...item,
                owner: insertedUsers[0]._id, // Assign first user (host) as owner
                geometry: { type: "Point", coordinates: coords },
                trueMonthlyCost,
                realityScore: 0,
                reviewCount: 0,
                reviews: []
            };
        });

        const inserted = await Listing.insertMany(docs);
        console.log(`Inserted ${inserted.length} RoomRadar PG listings`);

        // Seed reviews and assign to listings
        console.log("Seeding reviews...");
        const reviewsByListing = {};
        
        // Initialize array for each listing
        inserted.forEach(listing => {
            reviewsByListing[listing._id.toString()] = [];
        });
        
        // Create reviews and assign to listings
        const reviewDocs = seedReviews.map((reviewData, idx) => {
            const listingIndex = idx % inserted.length;
            const listing = inserted[listingIndex];
            
            const review = {
                ...reviewData,
                author: insertedUsers[(idx + 1) % insertedUsers.length]._id // Different user authors
            };
            
            // Track which reviews belong to which listing
            reviewsByListing[listing._id.toString()].push(review);
            
            return review;
        });

        const insertedReviews = await Review.insertMany(reviewDocs);
        console.log(`Inserted ${insertedReviews.length} reviews`);

        // Update listings with review IDs and recalculate reality scores
        console.log("Updating listings with reviews...");
        let reviewIndex = 0;
        for (let i = 0; i < inserted.length; i++) {
            const listing = inserted[i];
            const listingReviewsData = reviewsByListing[listing._id.toString()];
            
            // Get the actual inserted review objects for this listing
            const listingReviews = insertedReviews.slice(reviewIndex, reviewIndex + listingReviewsData.length);
            reviewIndex += listingReviewsData.length;
            
            // Add review IDs to listing
            listing.reviews = listingReviews.map(r => r._id);
            
            // Calculate reality score
            if (listingReviews.length > 0) {
                const { score, reviewCount } = computeRealityScore(listingReviews);
                listing.realityScore = score;
                listing.reviewCount = reviewCount;
            }
            
            await listing.save();
        }

        console.log("✅ Database seeding completed successfully!");
    } catch (err) {
        console.error("❌ Seeding failed:", err);
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    }
}

main();