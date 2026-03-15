const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
    filename: "cozy-beachfront-cottage",
    url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
  },
    price: 1500,
    location: "Malibu",
    country: "United States",
    owner: "69b6c74bc6dd24d945fdd721",
    geometry: { type: "Point", coordinates: [-118.68, 34.04] }
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
    filename: "modern-loft-in-downtown",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
    price: 1200,
    location: "New York City",
    country: "United States",
    owner: "69b6d47a18f9ea5b247efe7b",
    geometry: { type: "Point", coordinates: [-74.01, 40.71] }
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin surrounded by nature.",
    image: {
    filename: "mountain-retreat",
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  },
    price: 1000,
    location: "Aspen",
    country: "United States",
    owner: "69b6d628ee268e2f404a0ea8",
    geometry: { type: "Point", coordinates: [-106.82, 39.19] }
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa.",
    image: {
    filename: "historic-villa-in-tuscany",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
    price: 2500,
    location: "Florence",
    country: "Italy",
    owner: "69b6d47a18f9ea5b247efe7b",
    geometry: { type: "Point", coordinates: [11.26, 43.77] }
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat.",
    image: {
    filename: "secluded-treehouse-getaway",
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
  },
    price: 800,
    location: "Portland",
    country: "United States",
    owner: "69b6c74bc6dd24d945fdd721",
    geometry: { type: "Point", coordinates: [-122.67, 45.51] }
  },
  {
    title: "Beachfront Paradise",
    description: "Step out onto the sandy beach from this beautiful condo.",
    image: {
    filename: "beachfront-paradise",
    url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9",
  },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    owner: "69b6d47a18f9ea5b247efe7b",
    geometry: { type: "Point", coordinates: [-87.07, 21.16] }
  },
  {
    title: "Rustic Cabin by the Lake",
    description: "Spend your days fishing and kayaking on a peaceful lake.",
    image: {
    filename: "rustic-cabin-by-the-lake",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    owner: "69b6d628ee268e2f404a0ea8",
    geometry: { type: "Point", coordinates: [-120.10, 39.10] }
  },
  {
    title: "Luxury Penthouse",
    description: "Panoramic city views from this luxury penthouse.",
    image: {
    filename: "luxury-penthouse",
    url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd",
  },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    owner: "69b6d47a18f9ea5b247efe7b",
    geometry: { type: "Point", coordinates: [-118.24, 34.05] }
  },
  {
    title: "Ski Chalet",
    description: "Hit the slopes right from your doorstep.",
    image: {
    filename: "ski-chalet",
    url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb",
  },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    owner: "69b6c74bc6dd24d945fdd721",
    geometry: { type: "Point", coordinates: [7.22, 46.10] }
  },
  {
    title: "Safari Lodge",
    description: "Experience wildlife in luxury safari accommodations.",
    image: {
    filename: "safari-lodge",
    url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
  },
    price: 4000,
    location: "Serengeti",
    country: "Tanzania",
    owner: "69b6d47a18f9ea5b247efe7b",
    geometry: { type: "Point", coordinates: [34.85, -2.15] }
  },
  {
    title: "Historic Canal House",
    description: "Stay in a preserved canal house in Amsterdam.",
    image: {
    filename: "historic-canal-house",
    url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
  },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    owner: "69b6d628ee268e2f404a0ea8",
    geometry: { type: "Point", coordinates: [4.90, 52.37] }
  },
  {
    title: "Private Island Retreat",
    description: "Have an entire island to yourself.",
    image: {
    filename: "private-island-retreat",
    url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972",
  },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    owner: "69b6d47a18f9ea5b247efe7b",
    geometry: { type: "Point", coordinates: [177.65, -18.00] }
  },
  {
    title: "Cotswolds Cottage",
    description: "Charming countryside escape.",
    image: {
    filename: "cotswolds-cottage",
    url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f",
  },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    owner: "69b6c74bc6dd24d945fdd721",
    geometry: { type: "Point", coordinates: [-1.80, 51.83] }
  },
  {
    title: "Boston Brownstone",
    description: "Elegant historic brownstone.",
    image: {
    filename: "boston-brownstone",
    url: "https://images.unsplash.com/photo-1533619239233-6280475a633a",
  },
    price: 2200,
    location: "Boston",
    country: "United States",
    owner: "69b6d47a18f9ea5b247efe7b",
    geometry: { type: "Point", coordinates: [-71.06, 42.36] }
  },
  {
    title: "Bali Bungalow",
    description: "Beachfront bungalow with pool.",
    image: {
    filename: "bali-bungalow",
    url: "https://images.unsplash.com/photo-1602391833977-358a52198938",
  },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    owner: "69b6d628ee268e2f404a0ea8",
    geometry: { type: "Point", coordinates: [115.14, -8.65] }
  },
  {
    title: "Banff Cabin",
    description: "Mountain views in Banff.",
    image: {
    filename: "banff-cabin",
    url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb",
  },
    price: 1500,
    location: "Banff",
    country: "Canada",
    owner: "69b6d47a18f9ea5b247efe7b",
    geometry: { type: "Point", coordinates: [-115.54, 51.18] }
  },
  {
    title: "Miami Art Deco Apartment",
    description: "1920s glamour apartment.",
    image: {
    filename: "miami-art-deco-apartment",
    url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579",
  },
    price: 1600,
    location: "Miami",
    country: "United States",
    owner: "69b6c74bc6dd24d945fdd721",
    geometry: { type: "Point", coordinates: [-80.19, 25.76] }
  },
  {
    title: "Phuket Villa",
    description: "Luxury villa with infinity pool.",
    image: {
    filename: "phuket-villa",
    url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9",
  },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    owner: "69b6d47a18f9ea5b247efe7b",
    geometry: { type: "Point", coordinates: [98.94, 7.89] }
  },
  {
    title: "Scottish Castle",
    description: "Historic castle stay.",
    image: {
    filename: "scottish-castle",
    url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98",
  },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    owner: "69b6d628ee268e2f404a0ea8",
    geometry: { type: "Point", coordinates: [-4.50, 57.50] }
  },
  {
    title: "Dubai Desert Oasis",
    description: "Luxury desert retreat.",
    image: {
    filename: "dubai-desert-oasis",
    url: "https://images.unsplash.com/photo-1518684079-3c830dcef090",
  },
    price: 5000,
    location: "Dubai",
    country: "UAE",
    owner: "69b6d47a18f9ea5b247efe7b",
    geometry: { type: "Point", coordinates: [55.27, 25.20] }
  },
  {
    title: "Montana Log Cabin",
    description: "Rustic wilderness cabin.",
    image: {
    filename: "montana-log-cabin",
    url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f",
  },
    price: 1100,
    location: "Montana",
    country: "United States",
    owner: "69b6c74bc6dd24d945fdd721",
    geometry: { type: "Point", coordinates: [-109.64, 47.04] }
  },
  {
    title: "Greek Beach Villa",
    description: "Mediterranean beachfront escape.",
    image: {
    filename: "greek-beach-villa",
    url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f",
  },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
    owner: "69b6d47a18f9ea5b247efe7b",
    geometry: { type: "Point", coordinates: [25.33, 37.45] }
  },
  {
    title: "Eco Treehouse",
    description: "Eco-friendly forest retreat.",
    image: {
    filename: "eco-treehouse",
    url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7",
  },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    owner: "69b6d628ee268e2f404a0ea8",
    geometry: { type: "Point", coordinates: [-83.75, 9.75] }
  },
  {
    title: "Charleston Cottage",
    description: "Historic southern charm.",
    image: {
    filename: "charleston-cottage",
    url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904",
  },
    price: 1600,
    location: "Charleston",
    country: "United States",
    owner: "69b6d47a18f9ea5b247efe7b",
    geometry: { type: "Point", coordinates: [-79.93, 32.78] }
  },
  {
    title: "Tokyo Apartment",
    description: "Modern central Tokyo stay.",
    image: {
    filename: "tokyo-apartment",
    url: "https://images.unsplash.com/photo-1480796927426-f609979314bd",
  },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    owner: "69b6c74bc6dd24d945fdd721",
    geometry: { type: "Point", coordinates: [139.69, 35.68] }
  },
  {
    title: "New Hampshire Cabin",
    description: "Scenic lakefront retreat.",
    image: {
    filename: "new-hampshire-cabin",
    url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce",
  },
    price: 1200,
    location: "New Hampshire",
    country: "United States",
    owner: "69b6d47a18f9ea5b247efe7b",
    geometry: { type: "Point", coordinates: [-71.56, 43.65] }
  },
  {
    title: "Maldives Villa",
    description: "Overwater luxury villa.",
    image: {
    filename: "maldives-villa",
    url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000",
  },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
    owner: "69b6d628ee268e2f404a0ea8",
    geometry: { type: "Point", coordinates: [73.51, 4.17] }
  },
  {
    title: "Aspen Ski Chalet",
    description: "Luxury ski resort stay.",
    image: {
    filename: "aspen-ski-chalet",
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
  },
    price: 4000,
    location: "Aspen",
    country: "United States",
    owner: "69b6d47a18f9ea5b247efe7b",
    geometry: { type: "Point", coordinates: [-106.82, 39.19] }
  },
  {
    title: "Costa Rica Beach House",
    description: "Secluded surf getaway.",
    image: {
    filename: "costa-rica-beach-house",
    url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
  },
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
    owner: "69b6c74bc6dd24d945fdd721",
    geometry: { type: "Point", coordinates: [-83.75, 9.75] }
  },
];

const sampleReviews = [
  // Cozy Beachfront Cottage
  {
    comment: "Amazing views and very peaceful! The cottage is perfect for a romantic getaway.",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Good experience overall. The beach is just steps away!",
    rating: 4,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Loved every moment here. Highly recommended!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  // Modern Loft in Downtown
  {
    comment: "Perfect location in the heart of the city. Very modern and clean.",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Great loft, but a bit noisy due to city traffic.",
    rating: 3,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Awesome stay! Would definitely book again.",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  // Mountain Retreat
  {
    comment: "Such a serene place to unwind. Nature at its best!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Perfect for a peaceful weekend away from the city.",
    rating: 4,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Beautiful cabin with stunning mountain views!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  // Historic Villa in Tuscany
  {
    comment: "A taste of Italian luxury! Absolutely enchanting.",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Wonderful experience staying in a historic villa.",
    rating: 4,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Living the Tuscan dream! Highly recommended.",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  // Secluded Treehouse Getaway
  {
    comment: "Unique and magical! A once-in-a-lifetime experience.",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Amazing treehouse stay! The kids loved it.",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Very cool place, feels like being in nature.",
    rating: 4,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  // Beachfront Paradise
  {
    comment: "Paradise found! Perfect beach vacation spot.",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Stunning beachfront location with excellent amenities.",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Beautiful views and great service!",
    rating: 4,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  // Rustic Cabin by the Lake
  {
    comment: "Peaceful lakefront cabin, perfect for fishing!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Great getaway spot. Very relaxing environment.",
    rating: 4,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Lovely cabin with beautiful lake views!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  // Luxury Penthouse
  {
    comment: "Extraordinary views from this luxury penthouse!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Amazing amenities and panoramic city views.",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Luxury at its finest! Worth every penny.",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  // Ski Chalet
  {
    comment: "Perfect ski lodge experience! Very cozy.",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Great location on the slopes with excellent facilities.",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Amazing ski chalet with wonderful views!",
    rating: 4,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  // Safari Lodge
  {
    comment: "Incredible wildlife experience! Unforgettable adventure.",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Luxury safari experience with amazing animals.",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Best safari lodge experience ever!",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  // Historic Canal House
  {
    comment: "Charming Amsterdam canal house! Very authentic.",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Beautiful historic building with modern comfort.",
    rating: 4,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Wonderful Amsterdam experience!",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  // Private Island Retreat
  {
    comment: "Once in a lifetime experience! Absolutely heavenly.",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Private island paradise! Dream vacation realized.",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Incredible private island getaway!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  // Cotswolds Cottage
  {
    comment: "Charming countryside village experience!",
    rating: 4,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Perfect romantic getaway in the Cotswolds.",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Beautiful cottage with countryside charm!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  // Boston Brownstone
  {
    comment: "Historic brownstone with modern amenities.",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Elegant Boston accommodation!",
    rating: 4,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Great location in historic Boston!",
    rating: 4,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  // Bali Bungalow
  {
    comment: "Tropical paradise with beachfront access!",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Perfect Bali getaway with pool!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Beautiful Bali experience!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  // Banff Cabin
  {
    comment: "Stunning mountain views in Banff!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Perfect cabin retreat in the mountains.",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Great mountain experience in Banff!",
    rating: 4,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  // Miami Art Deco Apartment
  {
    comment: "Glamorous roaring twenties experience!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Beautiful Art Deco style apartment!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Fabulous Miami stay!",
    rating: 4,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  // Phuket Villa
  {
    comment: "Luxurious infinity pool villa in Phuket!",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Amazing luxury villa experience!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Beautiful Phuket villa!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  // Scottish Castle
  {
    comment: "Historic castle experience! Absolutely magical.",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Enchanting Scottish castle stay!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Amazing historic castle in Scotland!",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  // Dubai Desert Oasis
  {
    comment: "Luxury desert retreat with amazing views!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Incredible desert oasis experience!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Breathtaking Dubai desert experience!",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  // Montana Log Cabin
  {
    comment: "Rustic wilderness experience!",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Beautiful Montana log cabin!",
    rating: 4,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Great cabin retreat in Montana!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  // Greek Beach Villa
  {
    comment: "Mediterranean perfection!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Beautiful Greek island villa!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Amazing Mediterranean experience!",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  // Eco Treehouse
  {
    comment: "Eco-friendly forest retreat! Very sustainable.",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Wonderful eco-treehouse experience!",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Beautiful and eco-friendly!",
    rating: 4,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  // Charleston Cottage
  {
    comment: "Historic Southern charm!",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Lovely Charleston cottage!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Charming southern hospitality experience!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  // Tokyo Apartment
  {
    comment: "Modern Tokyo living experience!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Amazing Tokyo apartment!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Great central Tokyo location!",
    rating: 4,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  // New Hampshire Cabin
  {
    comment: "Scenic lakefront retreat!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Beautiful New Hampshire cabin!",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Perfect lakeside getaway!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  // Maldives Villa
  {
    comment: "Overwater paradise! Absolutely stunning.",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Incredible Maldives experience!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Amazing overwater villa!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  // Aspen Ski Chalet
  {
    comment: "Luxury ski resort experience!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
  {
    comment: "Perfect Aspen ski chalet!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Wonderful ski resort stay!",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  // Costa Rica Beach House
  {
    comment: "Secluded surf getaway paradise!",
    rating: 5,
    author: "69b6d628ee268e2f404a0ea8", // vemuru
  },
  {
    comment: "Amazing Costa Rica beach experience!",
    rating: 5,
    author: "69b6c74bc6dd24d945fdd721", // demo
  },
  {
    comment: "Perfect Costa Rican beach house!",
    rating: 5,
    author: "69b6d47a18f9ea5b247efe7b", // KIvee
  },
];

const listingCoordinates = {
  "Malibu, United States": [-118.7798, 34.0259],
  "New York City, United States": [-74.006, 40.7128],
  "Aspen, United States": [-106.8175, 39.1911],
  "Florence, Italy": [11.2558, 43.7696],
  "Portland, United States": [-122.6784, 45.5152],
  "Cancun, Mexico": [-86.8515, 21.1619],
  "Lake Tahoe, United States": [-120.0324, 39.0968],
  "Los Angeles, United States": [-118.2437, 34.0522],
  "Verbier, Switzerland": [7.2286, 46.0964],
  "Serengeti, Tanzania": [34.6857, -2.3333],
  "Amsterdam, Netherlands": [4.9041, 52.3676],
  "Fiji, Fiji": [178.065, -17.7134],
  "Cotswolds, United Kingdom": [-1.8433, 51.833],
  "Boston, United States": [-71.0589, 42.3601],
  "Bali, Indonesia": [115.1889, -8.4095],
  "Banff, Canada": [-115.5708, 51.1784],
  "Miami, United States": [-80.1918, 25.7617],
  "Phuket, Thailand": [98.391, 7.8804],
  "Scottish Highlands, United Kingdom": [-4.2026, 57.12],
  "Dubai, UAE": [55.2708, 25.2048],
  "Montana, United States": [-110.3626, 46.8797],
  "Mykonos, Greece": [25.3289, 37.4467],
  "Costa Rica, Costa Rica": [-83.7534, 9.7489],
  "Charleston, United States": [-79.9311, 32.7765],
  "Tokyo, Japan": [139.6503, 35.6762],
  "New Hampshire, United States": [-71.5724, 43.1939],
  "Maldives, Maldives": [73.2207, 3.2028]
};

const listingCategoriesByTitle = {
  "Cozy Beachfront Cottage": "beachs",
  "Modern Loft in Downtown": "rooms",
  "Mountain Retreat": "budget",
  "Historic Villa in Tuscany": "top-rated",
  "Secluded Treehouse Getaway": "unique-stays",
  "Beachfront Paradise": "beachs",
  "Rustic Cabin by the Lake": "cabins",
  "Luxury Penthouse": "trending",
  "Ski Chalet": "mountains",
  "Safari Lodge": "nature",
  "Historic Canal House": "city",
  "Private Island Retreat": "unique-stays",
  "Cotswolds Cottage": "nature",
  "Boston Brownstone": "city",
  "Bali Bungalow": "beachs",
  "Banff Cabin": "cabins",
  "Miami Art Deco Apartment": "city",
  "Phuket Villa": "beachs",
  "Scottish Castle": "unique-stays",
  "Dubai Desert Oasis": "trending",
  "Montana Log Cabin": "camping",
  "Greek Beach Villa": "beachs",
  "Eco Treehouse": "camping",
  "Charleston Cottage": "locations",
  "Tokyo Apartment": "city",
  "New Hampshire Cabin": "cabins",
  "Maldives Villa": "top-rated",
  "Aspen Ski Chalet": "mountains",
  "Costa Rica Beach House": "beachs"
};

const listingsWithGeometry = sampleListings.map((listing) => {
  const key = `${listing.location}, ${listing.country}`;
  const coordinates = listingCoordinates[key] || [78.4772, 17.4065];
  const category = listingCategoriesByTitle[listing.title] || "trending";

  return {
    ...listing,
    category,
    geometry: {
      type: "Point",
      coordinates
    }
  };
});

module.exports = { data: listingsWithGeometry, reviews: sampleReviews };

