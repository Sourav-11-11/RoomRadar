const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const ExpressError = require("../utils/ExpressError.js");
const { computeTrueMonthlyCost } = require("../utils/roomRadarMetrics.js");
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

// PG-specific filter configuration mapped to Mongo query fragments and optional sorts.
const FILTER_OPTIONS = {
  // Budget filters (based on true monthly cost = rent + electricity + maintenance)
  "low-budget": { query: { trueMonthlyCost: { $gte: 0, $lt: 8000 } }, sort: { trueMonthlyCost: 1 }, category: "budget" },
  "mid-range": { query: { trueMonthlyCost: { $gte: 8000, $lte: 15000 } }, sort: { trueMonthlyCost: 1 }, category: "budget" },
  "premium-pg": { query: { trueMonthlyCost: { $gt: 15000 } }, sort: { trueMonthlyCost: 1 }, category: "budget" },
  
  // Gender preference filters
  "boys-pg": { query: { genderPreference: "boys" }, category: "gender" },
  "girls-pg": { query: { genderPreference: "girls" }, category: "gender" },
  "unisex-pg": { query: { genderPreference: "unisex" }, category: "gender" },
  "co-living": { query: { $or: [{ genderPreference: "unisex" }, { roomType: "triple" }] }, category: "gender" },
  
  // Amenity filters
  "food-included": { query: { foodIncluded: true }, category: "amenity" },
  "wifi-available": { query: { wifiAvailable: true }, category: "amenity" },
  
  // Room type filters
  "single-room": { query: { roomType: "single" }, category: "roomType" },
  "double-sharing": { query: { roomType: "double" }, category: "roomType" },
  "triple-sharing": { query: { roomType: "triple" }, category: "roomType" },
  
  // Rating filter
  "top-rated": { query: { realityScore: { $gte: 4 } }, sort: { realityScore: -1 }, category: "rating" },
  
  // Location filter
  "near-it-hubs": {
    query: {
      location: {
        $in: [
          "HITEC City, Hyderabad",
          "Madhapur, Hyderabad",
          "Gachibowli / Nanakramguda, Hyderabad",
          "Kondapur, Hyderabad",
          "Financial District, Hyderabad",
          "Kukatpally JNTU, Hyderabad"
        ]
      }
    },
    category: "location"
  }
};

// Filter categories to prevent multiple selection from same category
const FILTER_CATEGORIES = {
  budget: ["low-budget", "mid-range", "premium-pg"],
  gender: ["boys-pg", "girls-pg", "unisex-pg", "co-living"],
  roomType: ["single-room", "double-sharing", "triple-sharing"],
  rating: ["top-rated"],
  amenity: ["food-included", "wifi-available"],
  location: ["near-it-hubs"]
};

module.exports.index = async (req, res) => {
  const searchTerm = (req.query.q || "").trim();
  const sortBy = req.query.sort || "";
  
  // Support both single filter (legacy) and multiple filters (new)
  let selectedFilters = [];
  if (req.query.filters) {
    // Multiple filters: ?filters=boys-pg,top-rated,mid-range
    selectedFilters = req.query.filters.split(",").map(f => f.trim()).filter(f => FILTER_OPTIONS[f]);
  } else if (req.query.filter && req.query.filter !== "all") {
    // Single filter (legacy): ?filter=boys-pg
    selectedFilters = [req.query.filter];
  }

  const queryClauses = [];

  // Match title or location when a search term is provided
  if (searchTerm) {
    const regex = new RegExp(searchTerm, "i");
    const searchQueries = [];
    
    // Search in title (higher priority)
    searchQueries.push({ title: regex });
    
    // Search in location
    searchQueries.push({ location: regex });
    
    // Search in description
    searchQueries.push({ description: regex });
    
    // Search for specific amenities if keywords match
    if (searchTerm.toLowerCase().includes("food")) {
      searchQueries.push({ foodIncluded: true });
    }
    if (searchTerm.toLowerCase().includes("wifi")) {
      searchQueries.push({ wifiAvailable: true });
    }
    
    queryClauses.push({ $or: searchQueries });
  }

  // Apply selected filters using $and to combine all conditions
  if (selectedFilters.length > 0) {
    selectedFilters.forEach(filter => {
      const filterConfig = FILTER_OPTIONS[filter];
      if (filterConfig && filterConfig.query) {
        queryClauses.push(filterConfig.query);
      }
    });
  }

  const mongoQuery = queryClauses.length ? { $and: queryClauses } : {};

  // Determine sort clause
  let sortClause = { _id: 1 };
  if (sortBy === "price_asc") sortClause = { price: 1 };
  else if (sortBy === "price_desc") sortClause = { price: -1 };
  else if (sortBy === "highest_rated") sortClause = { realityScore: -1 };
  else if (sortBy === "newest") sortClause = { _id: -1 };
  else if (selectedFilters.length > 0) {
    // Use sort from the first filter if available
    const firstFilter = FILTER_OPTIONS[selectedFilters[0]];
    if (firstFilter?.sort) sortClause = firstFilter.sort;
  }

  const [allListings, availableLocations] = await Promise.all([
    Listing.find(mongoQuery)
      .select("title description price image _id category location trueMonthlyCost realityScore roomType genderPreference wifiAvailable foodIncluded electricityCost maintenanceCost depositAmount")
      .sort(sortClause)
      .lean(),
    Listing.distinct("location")
  ]);

  availableLocations.sort((a, b) => a.localeCompare(b));

  // AJAX Support: If the request asks for JSON (e.g. from frontend fetch), return raw data
  // This allows for dynamic filtering without page reloads
  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
    return res.json({ 
      listings: allListings, 
      count: allListings.length,
      locations: availableLocations 
    });
  }

  res.render("listings/index", {
    allListings,
    selectedFilters,
    availableLocations,
    searchTerm,
    sortBy,
    filterOptions: FILTER_OPTIONS,
    filterCategories: FILTER_CATEGORIES,
    showTax: false
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.show = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author"
      }
    })
    .populate("owner").lean();
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing });
};

module.exports.create = async (req, res, next) => {
  const geoData = await geocoder.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  }).send();

  if (!geoData.body.features.length) {
    throw new ExpressError("Please enter a valid location", 400);
  }

  if (!req.file) {
    req.flash("error", "Valid image upload is mandatory for new listings.");
    return res.redirect("/listings/new");
  }

  let url = req.file.path;
  let filename = req.file.filename;

  const { listing: incomingListing } = req.body;
  const newListing = new Listing({
    ...incomingListing,
    foodIncluded: !!incomingListing.foodIncluded,
    wifiAvailable: incomingListing.wifiAvailable === undefined ? true : !!incomingListing.wifiAvailable,
    image: { url, filename },
    geometry: geoData.body.features[0].geometry
  });

  // Compute and persist true monthly cost at creation.
  newListing.trueMonthlyCost = computeTrueMonthlyCost({
    price: newListing.price,
    electricityCost: newListing.electricityCost,
    maintenanceCost: newListing.maintenanceCost,
    foodIncluded: newListing.foodIncluded
  });

  // Reality score starts at zero until reviews arrive.
  newListing.realityScore = 0;
  newListing.reviewCount = 0;

  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "Successfully created a new listing!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  const listing = req.listing;
  
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace(/\/upload\//, "/upload/h_300,w_250/"); // Resize to width 300px
  res.render("listings/edit", { listing , originalImageUrl});
};

module.exports.update = async (req, res, next) => {
  let image = undefined;
  if (req.file) {
    image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  const updateData = { ...req.body.listing };
  updateData.foodIncluded = !!updateData.foodIncluded;
  updateData.wifiAvailable = updateData.wifiAvailable === undefined ? true : !!updateData.wifiAvailable;

  if (updateData.location) {
    const geoData = await geocoder.forwardGeocode({
      query: updateData.location,
      limit: 1
    }).send();

    if (!geoData.body.features.length) {
      throw new ExpressError("Please enter a valid location", 400);
    }

    updateData.geometry = geoData.body.features[0].geometry;
  }

  if (image) {
    updateData.image = image;
  }

  // Recompute true monthly cost when cost inputs change.
  updateData.trueMonthlyCost = computeTrueMonthlyCost({
    price: updateData.price,
    electricityCost: updateData.electricityCost,
    maintenanceCost: updateData.maintenanceCost,
    foodIncluded: updateData.foodIncluded
  });

  await Listing.findByIdAndUpdate(req.params.id, updateData);
  req.flash("success", "Successfully updated the listing!");
  res.redirect(`/listings/${req.params.id}`);
};

module.exports.destroy = async (req, res, next) => {
  const deletedListing = await Listing.findByIdAndDelete(req.params.id);
  console.log("Deleted listing:", deletedListing._id);
  req.flash("success", "Successfully deleted the listing!");
  res.redirect("/listings");
};