const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const ExpressError = require("../utils/ExpressError.js");
const { computeTrueMonthlyCost } = require("../utils/roomRadarMetrics.js");
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

const FILTER_OPTIONS = [
  "trending",
  "locations",
  "top-rated",
  "budget",
  "mountains",
  "nature",
  "camping",
  "beachs"
];

module.exports.index = async (req, res) => {
  const requestedFilter = req.query.filter || "all";
  const selectedLocation = (req.query.location || "").trim();
  const searchTerm = (req.query.q || "").trim();
  let activeFilter = requestedFilter;

  const queryClauses = [];

  // Match title or location when a search term is provided
  if (searchTerm) {
    const regex = new RegExp(searchTerm, "i");
    queryClauses.push({ $or: [{ title: regex }, { location: regex }] });
    activeFilter = "all"; // search overrides pill filters for clarity
  }

  // Category/location filter pills remain compatible with search
  if (requestedFilter === "locations") {
    if (selectedLocation) {
      queryClauses.push({ location: selectedLocation });
    }
  } else if (requestedFilter !== "all" && FILTER_OPTIONS.includes(requestedFilter)) {
    queryClauses.push({ category: requestedFilter });
  } else if (!searchTerm) {
    activeFilter = "all";
  }

  const mongoQuery = queryClauses.length ? { $and: queryClauses } : {};

  const [allListings, availableLocations] = await Promise.all([
    Listing.find(mongoQuery)
      .select("title description price image _id category location trueMonthlyCost realityScore roomType genderPreference wifiAvailable foodIncluded")
      .lean(),
    Listing.distinct("location")
  ]);

  availableLocations.sort((a, b) => a.localeCompare(b));

  res.render("listings/index", {
    allListings,
    activeFilter,
    availableLocations,
    selectedLocation,
    searchTerm,
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

  let url = "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?auto=format&fit=crop&w=800&q=60";
  let filename = "default-listing-image";
  if (req.file) {
    url = req.file.path;
    filename = req.file.filename;
  }

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