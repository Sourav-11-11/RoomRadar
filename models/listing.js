const mongoose = require('mongoose');
const Schema = mongoose.Schema
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

    // Base monthly rent (kept as `price` to avoid breaking existing code and views)
    price: {
        type: Number,
        default: 0
    },

    // RoomRadar PG-specific cost breakdown
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

    // Derived monthly cost stored for quick reads
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

    // Reality score cached on the listing for faster reads
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
    
    // Geometry for map location
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
            default: [78.4867, 17.3850] // Default to Hyderabad
        }
    }
});

// Create indexes for high-performance filtering and search
listingSchema.index({ title: 'text', description: 'text', location: 'text' }); // Full-text search
listingSchema.index({ trueMonthlyCost: 1 }); // Budget filtering
listingSchema.index({ realityScore: -1 }); // Top-rated sorting
listingSchema.index({ genderPreference: 1, roomType: 1 }); // Compound index for common filters
listingSchema.index({ geometry: '2dsphere' }); // Geo-spatial queries

// Virtual for formatted price
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