if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");

const MONGO_URL = process.env.ATLAS_URL ;

main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);


const sessionstore = MongoStore.create({
    mongoUrl: MONGO_URL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: process.env.SECRET_KEY
    }
});

sessionstore.on("error", (error) => {
    console.log("Session store error:", error);
});

const sessionOptions = {
    sessionstore,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
};


// app.get("/", (req, res) => {
//   res.redirect("/listings");
// });

app.use(session(sessionOptions));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    res.locals.searchTerm = ""; // default for navbar search input
    next();
});

// app.get("/demouser", async (req, res) => {
//     const fakeuser = new User({ 
//         email: "demo@example.com",
//         username: "demouser"
//      });

//      const registeredUser = await User.register(fakeuser, "password123");
//      res.send("Demo user created");
// });

//routes 
app.get("/", (req, res) => {
    res.render("home");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err); 
    console.error("[Express Error]", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(statusCode).render("error", { statusCode, message });
});

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
});
