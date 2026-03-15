git clone https://github.com/yourusername/sweet-stays.git
<div align="center">

# 🧭 RoomRadar

### *PG accommodation discovery for students with transparent costs and reality scores*

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mapbox](https://img.shields.io/badge/Mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white)](https://www.mapbox.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

</div>

---

## 🚀 Overview

RoomRadar is a full-stack PG accommodation discovery platform for students. It highlights true monthly costs, food/wifi availability, gender preference, and a reality score derived from multi-category reviews. Built with server-rendered EJS, Mapbox maps, Cloudinary uploads, and Passport authentication.

---

## ✨ Features

- Authentication with Passport (signup, login, logout, flash messaging)
- Listings CRUD with ownership checks and Cloudinary image uploads
- True monthly cost breakdown (rent + electricity + maintenance + food handling)
- PG details: room type, food included, wifi availability, gender preference, deposit
- Multi-category reviews (food, cleanliness, wifi, noise, safety, owner behavior)
- Reality score cached per listing; Mapbox GL JS map per listing
- Search and category filters; responsive Bootstrap UI

---

## 🛠️ Tech Stack

- Node.js, Express, MongoDB/Mongoose
- EJS + ejs-mate, Bootstrap 5
- Passport.js, connect-mongo sessions
- Cloudinary + multer-storage-cloudinary, Mapbox GL JS
- Joi validation, custom middleware

---

## 📁 Structure
```
RoomRadar/
├── controllers/      # Listings, users, reviews
├── routes/           # Express routers
├── models/           # Mongoose schemas
├── views/            # EJS templates
├── public/           # Static assets (css, js)
├── middleware/       # Auth/ownership/validation guards
├── utils/            # Helpers (errors, async wrapper, metrics)
├── config/           # (recommended) env/security/upload config
├── app.js            # Server bootstrap
├── schema.js         # Joi schemas
└── cloudConfig.js    # Cloudinary storage config
```

---

## ⚙️ Getting Started

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Fill values for Mongo, Mapbox, Cloudinary, session secret

# Run (dev)
node app.js
# -> http://localhost:8080
```

### Environment Variables
```
ATLAS_URL=
SECRET_KEY=
MAPBOX_TOKEN=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

---

## 🔍 How Key Pieces Work

- Geocoding: location string → Mapbox geocode → GeoJSON stored → map rendered on show page
- Uploads: multer + Cloudinary storage → URL/filename persisted on listing
- Auth/authorization: session-based login; guards for logged-in and owner-only routes
- Reality score: derived from composite review categories and review count, cached on listing

---

## 📸 Screenshots

Add screenshots or GIFs of index, show (with cost breakdown + reality score), and review form.

---

## 🔮 Future Ideas

- Bookmark/save listings
- Sorting by price/reality score
- Review helpful votes
- Basic rate limiting and CSP hardening

---

## 📄 License

MIT © Vemuru Sourav

