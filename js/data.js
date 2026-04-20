// AZURA — product & category data
const PRODUCTS = [
  { id: "azura-phone-15", name: "Azura Phone 15 Pro", brand: "Azura", category: "Smartphones", price: 999, oldPrice: 1099, rating: 4.8, reviews: 1240, image: "images/p-phone.jpg", badge: "Bestseller", description: "Flagship smartphone with a brilliant OLED display, pro-grade camera system, and all-day battery life.", specs: [["Display","6.3\" OLED 120Hz"],["Chip","A17 Bionic"],["Storage","256GB"],["Camera","48MP Triple"]] },
  { id: "azura-book-air", name: "Azura Book Air 14", brand: "Azura", category: "Laptops", price: 1299, rating: 4.7, reviews: 832, image: "images/p-laptop.jpg", badge: "New", description: "Featherlight 14\" laptop with a stunning Liquid Retina display and up to 18 hours of battery.", specs: [["Display","14\" Liquid Retina"],["Chip","M3"],["RAM","16GB"],["Storage","512GB SSD"]] },
  { id: "azura-buds-pro", name: "Azura Buds Pro", brand: "Azura", category: "Accessories", price: 199, oldPrice: 249, rating: 4.6, reviews: 2103, image: "images/p-earbuds.jpg", badge: "Sale", description: "Active noise cancelling earbuds with adaptive audio and spatial sound.", specs: [["ANC","Adaptive"],["Battery","30 hr w/ case"],["Charging","USB-C / Wireless"],["Water","IPX4"]] },
  { id: "azura-watch-9", name: "Azura Watch Series 9", brand: "Azura", category: "Accessories", price: 399, rating: 4.5, reviews: 540, image: "images/p-watch.jpg", badge: "New", description: "Track every workout, every heartbeat, every day with the brightest Azura Watch yet.", specs: [["Case","45mm Aluminum"],["Display","Always-On Retina"],["Battery","18 hr"],["GPS","Built-in"]] },
  { id: "azura-mech-keys", name: "Stratus RGB Mechanical", brand: "Stratus", category: "Gaming Setup", price: 149, oldPrice: 179, rating: 4.7, reviews: 980, image: "images/p-keyboard.jpg", badge: "Sale", description: "Tactile hot-swappable mechanical keyboard with per-key RGB and aluminum frame.", specs: [["Switches","Hot-swap"],["Layout","TKL"],["Lighting","Per-key RGB"],["Connection","USB-C"]] },
  { id: "azura-curve-34", name: "Curve 34\" Gaming Monitor", brand: "Stratus", category: "Gaming Setup", price: 549, rating: 4.8, reviews: 612, image: "images/p-monitor.jpg", badge: "Bestseller", description: "Ultrawide 34\" curved QHD monitor with 165Hz refresh rate and 1ms response.", specs: [["Size","34\" curved"],["Resolution","3440 × 1440"],["Refresh","165Hz"],["Panel","VA HDR"]] },
  { id: "azura-headphones-max", name: "Azura Headphones Max", brand: "Azura", category: "Accessories", price: 449, rating: 4.6, reviews: 1108, image: "images/p-headphones.jpg", badge: null, description: "Over-ear headphones with high-fidelity sound and immersive spatial audio.", specs: [["Driver","40mm dynamic"],["ANC","Hybrid"],["Battery","40 hr"],["Weight","385g"]] },
  { id: "nimbus-speaker", name: "Nimbus Smart Speaker", brand: "Nimbus", category: "Smart Home", price: 129, oldPrice: 159, rating: 4.4, reviews: 420, image: "images/p-speaker.jpg", badge: "Sale", description: "Room-filling 360° sound with built-in voice assistant and smart home hub.", specs: [["Output","20W"],["Voice","Built-in"],["Connectivity","Wi-Fi / BT 5.3"],["Hub","Matter, Thread"]] },
  { id: "azura-pad-11", name: "Azura Pad 11", brand: "Azura", category: "Latest Tech", price: 599, rating: 4.7, reviews: 760, image: "images/p-tablet.jpg", badge: "New", description: "All-screen 11\" tablet with Liquid Retina, M2 chip, and pencil support.", specs: [["Display","11\" Liquid Retina"],["Chip","M2"],["Storage","128GB"],["Battery","10 hr"]] },
  { id: "voltcore-power-20k", name: "VoltCore 20K Power Bank", brand: "VoltCore", category: "Budget Deals", price: 39, oldPrice: 59, rating: 4.5, reviews: 3120, image: "images/p-powerbank.jpg", badge: "Sale", description: "20,000 mAh fast-charging power bank with USB-C PD and dual outputs.", specs: [["Capacity","20,000 mAh"],["Output","USB-C PD 30W"],["Ports","2 × USB-A, 1 × USB-C"],["Weight","380g"]] }
];

const CATEGORIES = [
  { slug: "Gaming Setup",  title: "Gaming Setup",  subtitle: "Built for gamers",   img: "images/cat-gaming.jpg" },
  { slug: "Budget Deals",  title: "Budget Deals",  subtitle: "Smart picks",        img: "images/cat-budget.jpg" },
  { slug: "Latest Tech",   title: "Latest Tech",   subtitle: "Cutting edge",       img: "images/cat-latest.jpg" },
  { slug: "Smartphones",   title: "Smartphones",   subtitle: "Stay connected",     img: "images/cat-phones.jpg" },
  { slug: "Laptops",       title: "Laptops",       subtitle: "Work & play",        img: "images/cat-laptops.jpg" },
  { slug: "Accessories",   title: "Accessories",   subtitle: "Essentials",         img: "images/cat-accessories.jpg" },
  { slug: "Smart Home",    title: "Smart Home",    subtitle: "Connected living",   img: "images/cat-smarthome.jpg" }
];

const getProduct = (id) => PRODUCTS.find(p => p.id === id);
