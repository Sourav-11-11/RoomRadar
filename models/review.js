const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    comment: String,
    
    foodQuality: { type: Number, min: 1, max: 5 },
    cleanliness: { type: Number, min: 1, max: 5 },
    wifi: { type: Number, min: 1, max: 5 },
    noise: { type: Number, min: 1, max: 5 },
    safety: { type: Number, min: 1, max: 5 },
    ownerBehavior: { type: Number, min: 1, max: 5 },

    rating: {
        type: Number,
        min: 1,
        max: 5
    },

    compositeScore: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;