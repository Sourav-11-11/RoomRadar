const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        default: 0
    },
    foodIncluded: {
        type: Boolean,
        default: false
    },
    electricityCost: {
        type: Number,
        default: 0
    },
    maintenanceCost: {
        type: Number,
        default: 0
    },
    depositAmount: {
        type: Number,
        default: 0
    },
    wifiAvailable: {
        type: Boolean,
        default: true
    },
    roomType: {
        type: String,
        enum: ["single", "double", "triple"],
        default: "single"
    },
    genderPreference: {
        type: String,
        enum: ["boys", "girls", "unisex"],
        default: "unisex"
    },
    trueMonthlyCost: {
        type: Number,
        default: 0
    },
    location: String,
    country: String,
    category: {
        type: String,
        enum: [
            "trending",
            "rooms",
            "locations",
            "top-rated",
            "budget",
            "mountains",
            "nature",
            "camping",
            "city",
            "beachs",
            "cabins",
            "unique-stays"
        ],
        default: "trending"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    realityScore: {
        type: Number,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [78.4867, 17.3850] 
        }
    }
});

listingSchema.index({ title: 'text', description: 'text', location: 'text' });
listingSchema.index({ trueMonthlyCost: 1 });
listingSchema.index({ realityScore: -1 });
listingSchema.index({ genderPreference: 1, roomType: 1 });
listingSchema.index({ geometry: '2dsphere' });

listingSchema.virtual('formattedPrice').get(function() {
    return this.trueMonthlyCost.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    });
});

listingSchema.post("findOneAndDelete", async function(listings) {
  if(listings){
    await Review.deleteMany({ _id: { $in: listings.reviews } });
  }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;