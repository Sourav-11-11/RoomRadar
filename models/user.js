const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
            "Please fill a valid email address"
        ]
    },
    
    // User role/type for RoomRadar
    userType: {
        type: String,
        enum: ["student", "working-professional", "host", "admin"],
        default: "student"
    },
    
    // Phone verification status
    phoneVerified: {
        type: Boolean,
        default: false
    },
    
    // User profile completion
    profileComplete: {
        type: Boolean,
        default: false
    },
    
    // User profile details
    phone: String,
    city: String,
    bio: String,
    
    // Listings created by host
    listings: [
        {
            type: Schema.Types.ObjectId,
            ref: "Listing"
        }
    ],
    
    // Reviews written by user
    reviewsWritten: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    
    // Wishlist/saved listings
    savedListings: [
        {
            type: Schema.Types.ObjectId,
            ref: "Listing"
        }
    ],
    
    createdAt: {
        type: Date,
        default: Date.now()
    }

   // username and password will be added by passport-local-mongoose plugin
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);