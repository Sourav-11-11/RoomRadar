<div align="center">

# 🏠 RoomRadar

### *A smart PG discovery platform — find the perfect student housing*

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mapbox](https://img.shields.io/badge/Mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white)](https://www.mapbox.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

**[Live Demo](#) · [Report Bug](#) · [Request Feature](#)**

</div>

---

## 🚀 What Is This?

**RoomRadar** is a modern Paying Guest (PG) discovery and booking platform designed specifically for students and working professionals in Hyderabad. Users can **browse, list, and review PGs** across multiple locations with intelligent filtering by budget, amenities, gender preference, and proximity to IT hubs. Built end-to-end with authentication, cloud image storage, interactive maps, real-time reviews, and a fully responsive UI — all without a frontend framework.

> Built from scratch — every feature is production-wired with geospatial mapping, persistent sessions, cloud storage, and full CRUD with authorization guards.

---

## ✨ Features at a Glance

| Area | What's Built |
|---|---|
| 🔐 **Authentication** | Signup · Login · Logout via Passport.js local strategy with secure session persistence |
| 🏠 **PG Listings** | Full CRUD — create, view, edit, delete with ownership verification |
| 💰 **Smart Filtering** | Budget tiers (Low, Mid-range, Premium) · Gender preference · Room type (Single, Double, Triple) · Amenities (Food, WiFi) · Location proximity |
| 🗺️ **Interactive Maps** | Mapbox GL JS with live geocoding — every PG location rendered on an interactive map with markers |
| 📸 **Cloud Image Upload** | Cloudinary + Multer — drag & drop images stored in the cloud with instant preview |
| ⭐ **Review System** | 5-star ratings + detailed feedback on food quality, cleanliness, WiFi, noise, and safety |
| 🔍 **Advanced Search** | Case-insensitive search by PG name, location, or description + multi-filter combination |
| 📱 **Mobile-First UI** | Bootstrap 5 + custom CSS — responsive design for all devices, smart filter pills, adaptive navbar |
| 💬 **Real-Time Feedback** | Flash messages on all actions — signup, login, listing creation, errors, success states |
| 🛡️ **Data Validation** | Joi schema validation server-side + middleware guards on all protected routes |
| 💡 **Cost Transparency** | True monthly cost calculations including rent, electricity, and maintenance fees |

---

## 🛠️ Tech Stack

**Backend**
- Node.js + Express.js — RESTful APIs with clean MVC architecture
- MongoDB + Mongoose — document-oriented database with geospatial indexing
- Passport.js — local authentication strategy with session-based persistence
- connect-mongo — MongoDB session store for secure, scalable auth

**Frontend**
- EJS + ejs-mate — server-side templating with reusable layouts
- Bootstrap 5 — responsive grid system and UI components
- Custom CSS — branded theme, smooth animations, filter pills, interactive cards

**Integrations & APIs**
- Mapbox GL JS — interactive maps and geocoding API
- Cloudinary + Multer — cloud-based image storage and upload pipeline
- method-override — HTTP method override for PUT/DELETE operations
- Joi — schema validation for data integrity

**Database**
- MongoDB Atlas — scalable cloud database
- Mongoose ODM — schema-based data modeling with relationships

---

## 📁 Project Structure

```
RoomRadar/
├── controllers/              # Business logic layer
│   ├── listings.js          # PG CRUD, filtering, geocoding, image upload
│   ├── users.js             # Authentication (signup, login, logout)
│   └── reviews.js           # Review creation and management
├── routes/                   # Express route definitions
│   ├── listing.js           # /listings routes (all PG operations)
│   ├── user.js              # /signup, /login, /logout routes
│   └── review.js            # /listings/:id/reviews routes
├── models/                   # Mongoose schemas
│   ├── listing.js           # PG schema (title, price, amenities, location, reviews)
│   ├── user.js              # User schema with Passport integration
│   └── review.js            # Review schema (rating, comment, author)
├── views/                    # EJS templates
│   ├── layouts/
│   │   └── boilerplate.ejs  # Master layout template
│   ├── listings/
│   │   ├── index.ejs        # PG browse page with filters
│   │   ├── show.ejs         # Single PG detail + map + reviews
│   │   ├── new.ejs          # Create new listing form
│   │   └── edit.ejs         # Edit PG details form
│   ├── includes/
│   │   ├── navbar.ejs       # Navigation header
│   │   ├── footer.ejs       # Footer section
│   │   └── flash.ejs        # Alert messages
│   └── users/
│       ├── login.ejs        # Login form
│       └── signup.ejs       # Registration form
├── public/                   # Static assets
│   ├── css/
│   │   ├── style.css        # Main stylesheet
│   │   └── rating.css       # Star rating component styles
│   ├── js/
│   │   ├── map.js           # Mapbox initialization and rendering
│   │   └── script.js        # Frontend utility scripts
│   └── images/              # Brand assets and screenshots
├── middleware.js            # Auth & validation middleware
├── schema.js                # Joi validation schemas
├── cloudConfig.js           # Cloudinary + Multer configuration
├── init/                    # Database initialization
│   ├── data.js              # Seed data (14 sample PGs across Hyderabad)
│   └── index.js             # Seed script runner
├── utils/
│   ├── ExpressError.js      # Custom error class
│   └── WrapAsync.js         # Async error handling wrapper
├── app.js                   # Application entry point & middleware setup
├── package.json             # Dependencies & scripts
└── .env                     # Environment configuration (local only)
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB instance)
- Mapbox account (free tier available)
- Cloudinary account (free tier available)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/RoomRadar.git
cd RoomRadar

# 2. Install dependencies
npm install

# 3. Create .env file with your credentials
cp .env.example .env

# 4. Configure environment variables (see below)

# 5. Seed the database with sample PGs (optional)
node init/index.js

# 6. Start the development server
npm start
# or use nodemon for auto-reload:
nodemon app.js

# → Server runs on http://localhost:5555
```

### Environment Variables

```env
# MongoDB Connection
ATLAS_URL=mongodb+srv://username:password@cluster.mongodb.net/RoomRadar

# Session Secret
SECRET_KEY=your_secure_session_secret_key

# Mapbox
MAPBOX_TOKEN=your_mapbox_public_access_token

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

# Optional
PORT=5555
NODE_ENV=development
```

---

## � Screenshots & Features in Action

<table>
  <tr>
    <td colspan="2"><b>🏠 Homepage - Landing Page</b></td>
  </tr>
  <tr>
    <td colspan="2"><img src="public/images/home.png" width="100%"/></td>
  </tr>
  <tr>
    <td colspan="2"><hr></td>
  </tr>
  <tr>
    <td width="50%"><b>📋 Browse All Listings</b></td>
    <td width="50%"><b>➕ Create New Listing</b></td>
  </tr>
  <tr>
    <td><img src="public/images/Listings.png" width="100%"/></td>
    <td><img src="public/images/Become a Host - Create new Listing.png" width="100%"/></td>
  </tr>
  <tr>
    <td colspan="2"><hr></td>
  </tr>
  <tr>
    <td width="50%"><b>🗺️ View Details & Map</b></td>
    <td width="50%"><b>⭐ Reviews & Ratings</b></td>
  </tr>
  <tr>
    <td><img src="public/images/review & maps.png" width="100%"/></td>
    <td><img src="public/images/Details & write Reveiw.png" width="100%"/></td>
  </tr>
</table>
  

---

## �🗺️ How Key Features Work

### 📍 Geocoding & Maps Pipeline
1. User creates/edits a PG listing with location string (e.g., "HITEC City, Hyderabad")
2. Location is sent to **Mapbox Geocoding API** → receives coordinates
3. Coordinates stored as GeoJSON geometry in MongoDB listing document
4. On listing detail page, location geometry is rendered with **Mapbox GL JS**
5. Interactive marker with popup displays PG details on the map

### 🖼️ Cloud Image Upload Pipeline
1. User selects image(s) on the create/edit listing form
2. Form submits with `multipart/form-data` encoding
3. **Multer** middleware intercepts the file
4. **Multer-Storage-Cloudinary** streams file directly to Cloudinary
5. Cloudinary returns secure URL and filename
6. URL saved to listing document — no files stored on server

### 🔐 Authentication & Authorization
- **Login**: Passport.js local strategy validates credentials → session created
- **Session Management**: connect-mongo stores encrypted sessions in MongoDB
- **Protected Routes**: `isLoggedIn` middleware checks session validity
- **Resource Authorization**: `isOwner` middleware verifies user owns the resource before edit/delete
- **Error Handling**: Unauthorized access triggers flash message + redirect to login

### 🎯 Smart Filtering System
Multi-filter support with category enforcement:
- **Budget**: Low-Budget (₹0-8K) · Mid-Range (₹8K-15K) · Premium (₹15K+)
- **Gender**: Boys · Girls · Unisex · Co-living
- **Amenities**: Food Included · WiFi Available
- **Room Type**: Single · Double Sharing · Triple Sharing
- **Location**: Near IT Hubs (HITEC, Madhapur, Gachibowli, etc.)
- **Rating**: Top-Rated (4+ stars)

Multiple filters combined via MongoDB `$and` operator for precise results.

### 💰 True Cost Calculation
Displayed cost = Rent + Electricity Cost + Maintenance Cost
This transparency helps users compare actual monthly expenses across PGs.

---


| View | Feature |
|---|---|
| **Homepage** | Hero banner + trending PG carousel + quick filter pills |
| **Browse Page** | Grid layout with filter sidebar, search bar, sort options |
| **Listing Card** | Image, title, price, location, quick amenity badges, rating |
| **Detail Page** | Full description + interactive map + review section + image gallery |
| **Create/Edit** | Form with image upload, location autocomplete, cost calculator |
| **Reviews** | Breakdown by category (food, WiFi, cleanliness, noise, safety) |
| **Auth** | Clean login/signup forms with validation feedback |

---

## 📊 Sample Data

The database seeds with **14 realistic PG listings** across Hyderabad:
- Peace Heaven Karnatak
- Annupam Co Living PG
- Banjara Heights Women's PG
- Tech Nest Miyapur
- Finestay HITEC City
- Madhav PG Madhapur
- Suresh PG Kondapur
- Smart Living SR Nagar
- Royal Palace Jubilee Hills
- Scholar's Haven Kukatpally
- Gachibowli Corporate Stay
- Ameerpet ColiveSpace
- Kphb Friends Living
- Mehdipatnam Comfort Hub

Each includes real pricing, amenity details, descriptions, and sample reviews.

---

## 🧠 Architecture Decisions

**Why Express + EJS?**
- Lightweight, flexible, and perfect for real-time server rendering
- No build step needed — quick iterative development
- Server-side template rendering enables SEO and streaming

**Why MongoDB?**
- Document-flexible schema suits varying PG amenity lists
- Geospatial indexing (`2dsphere`) powers location proximity queries
- Mongoose relationships (references) keep data clean and queryable

**Why Mapbox?**
- Industry-standard interactive maps with zero compromise on UX
- Geocoding API handles address → coordinates conversion seamlessly
- GL JS renderer ensures smooth, performant markers even with multiple listings

**Why Cloudinary?**
- Serverless image storage eliminates disk management complexity
- Built-in transformations (crop, resize, compress) for responsive displays
- CDN distribution ensures fast image delivery globally

---

## 🔮 Future Roadmap

- [ ] Real booking calendar with guest availability
- [ ] Advanced date range filtering
- [ ] Payment integration (Razorpay / Stripe)
- [ ] PG owner dashboard with analytics
- [ ] Email notifications for bookings and reviews
- [ ] CSRF protection + rate limiting on auth routes
- [ ] Image optimization and lazy loading
- [ ] Map cluster view for multiple nearby listings
- [ ] Mobile app (React Native)
- [ ] Admin panel for content moderation

---

## 🤝 Contributing

Contributions are welcome! To get started:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

MIT © [Vemuru Sourav](https://github.com/Sourav-11-11)

---

## 📧 Contact & Support

- **Email**: sourav@example.com
- **GitHub**: [Sourav-11-11](https://github.com/Sourav-11-11)
- **Issues**: [Report a bug or request a feature](https://github.com/Sourav-11-11/RoomRadar/issues)

---

<div align="center">

**If you found RoomRadar useful, give it a ⭐ — it helps the project grow!**

Built with ❤️ by Sourav

</div>

