const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Product = require("./models/Product");

// 1. Load environment variables
dotenv.config();

const app = express();

// 2. Middleware (The guards)
app.use(cors());
app.use(express.json()); // Tells Express to understand JSON data sent by users

// 3. Connect to MongoDB
// moved to server start

// 4. API Routes (Our Waiter Services)

// ROUTE 1: GET ALL PRODUCTS (Read)

app.get("/api/products", async (req, res) => {
  try {
    // Sorting by updatedAt ensures that newly added AND recently edited
    // products appear at the top for the admin to see immediately.
    const products = await Product.find().sort({ updatedAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ROUTE 2: CREATE A PRODUCT (Create)
app.post("/api/products", async (req, res) => {
  try {
    const { title, price, image, category } = req.body;
    const newProduct = new Product({ title, price, image, category });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created Successfully!", product: newProduct });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Validation Failed", error: error.message });
  }
});

// ROUTE 3: DELETE A PRODUCT (Delete)
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product removed from database!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ROUTE 4: UPDATE PRODUCT (Update)

app.put("/api/products/:id", async (req, res) => {
  try {
    const { title, price, image, category } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, price, image, category },
      { new: true },
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to update product", error: error.message });
  }
});

// Catch-all route for non-existent endpoints
app.use((req, res) => {
  res
    .status(404)
    .json({ message: `Route ${req.originalUrl} not found on this server.` });
});

// 5. Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");

    // Start Server ONLY after database is connected
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`your app is running perfectly on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection error", err));
