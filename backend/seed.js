const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

// 1. Load environment variables
dotenv.config();

const MOCK_PRODUCTS = [
  {
    title: "Premium Sundarban Honey",
    price: 450,
    category: "Grocery",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2025/8/536944722/KV/WF/IR/70994321/sundarban-honey-500x500.jpg",
  },
  {
    title: "Pure Mustard Oil (Kachchi Ghani)",
    price: 320,
    category: "Grocery",
    image:
      "https://5.imimg.com/data5/FH/YS/OV/SELLER-21018134/mustard-oil-500x500.png",
  },
  {
    title: "Traditional Handloom Saree",
    price: 2500,
    category: "Clothing",
    image:
      "https://www.indianvillez.com/cdn/shop/collections/gggg.jpg?v=1692000285",
  },
  {
    title: "Walton Air Conditioner",
    price: 25000,
    category: "Electronics",
    image:
      "https://businessinspection.com.bd/wp-content/uploads/2022/02/Walton-Ac-1.jpg",
  },
];

const seedDatabase = async () => {
  try {
    // Connect to Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas for seeding...");

    // Clear existing products to prevent duplicates (optional)
    await Product.deleteMany();
    console.log("Old products cleared.");

    // Insert the mock data
    await Product.insertMany(MOCK_PRODUCTS);
    console.log("✅ Mock products successfully seeded into Atlas!");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
