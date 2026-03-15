const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn, checkListingExists, isOwner, validateListing } = require("../middleware.js");
const listingsController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const uploadCloud = multer({ storage });

router
    .route("/")
    .get(WrapAsync(listingsController.index))
    .post(
        isLoggedIn,
        uploadCloud.single("listing[image]"),
        validateListing,
        WrapAsync(listingsController.create)
    );
   

//new route
router.get("/new", isLoggedIn, listingsController.renderNewForm);

router
    .route("/:id")  
    .get(WrapAsync(listingsController.show))
    .put(
        isLoggedIn,
        checkListingExists,
        isOwner,
        uploadCloud.single("listing[image]"),
        validateListing,
        WrapAsync(listingsController.update)
    )
    .delete(
        isLoggedIn,
        checkListingExists,
        isOwner,
        WrapAsync(listingsController.destroy)
    );



//Edit Route
router.get(
    "/:id/edit",
    isLoggedIn,
    checkListingExists,
    isOwner,
    WrapAsync(listingsController.renderEditForm)
);

module.exports = router;