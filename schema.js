const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().uri().allow('').default('https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        category: Joi.string().valid(
            'trending',
            'locations',
            'top-rated',
            'budget',
            'mountains',
            'nature',
            'camping',
            'beachs'
        ).optional(),

        // RoomRadar PG-specific fields
        foodIncluded: Joi.boolean().optional(),
        electricityCost: Joi.number().min(0).optional(),
        maintenanceCost: Joi.number().min(0).optional(),
        depositAmount: Joi.number().min(0).optional(),
        wifiAvailable: Joi.boolean().optional(),
        roomType: Joi.string().valid('single', 'double', 'triple').optional(),  
        genderPreference: Joi.string().valid('boys', 'girls', 'unisex').optional(),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),

        // New multi-category ratings (1-5 each)
        foodQuality: Joi.number().min(1).max(5),
        cleanliness: Joi.number().min(1).max(5),
        wifi: Joi.number().min(1).max(5),
        noise: Joi.number().min(1).max(5),
        safety: Joi.number().min(1).max(5),
        ownerBehavior: Joi.number().min(1).max(5),

        // Legacy single rating kept to avoid breaking existing UI during transition
        rating: Joi.number().min(1).max(5),
    })
      // Require at least one rating source (any category or legacy rating)     
      .or('foodQuality','cleanliness','wifi','noise','safety','ownerBehavior','rating')
      .required()
});