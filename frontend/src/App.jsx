import React, { useState, useMemo } from "react";

const MOCK_PRODUCTS = [
  {
    _id: "1",
    title: "Premium Sundarban Honey",
    price: 450,
    category: "Grocery",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2025/8/536944722/KV/WF/IR/70994321/sundarban-honey-500x500.jpg",
  },
  {
    _id: "2",
    title: "Pure Mustard Oil (Kachchi Ghani)",
    price: 320,
    category: "Grocery",
    image:
      "https://5.imimg.com/data5/FH/YS/OV/SELLER-21018134/mustard-oil-500x500.png",
  },
  {
    _id: "3",
    title: "Traditional Handloom Saree",
    price: 2500,
    category: "Clothing",
    image:
      "https://www.indianvillez.com/cdn/shop/collections/gggg.jpg?v=1692000285",
  },
  {
    _id: "4",
    title: "Walton Air Conditioner",
    price: 25000,
    category: "Electronics",
    image:
      "https://businessinspection.com.bd/wp-content/uploads/2022/02/Walton-Ac-1.jpg",
  },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // Tracks typed text

  const handleWhatsAppClick = (productTitle, price) => {
    const phoneNumber = "+8801757360939";
    const message = encodeURIComponent(
      `Salam! I want to order your product: ${productTitle} for BDT ${price}. Please let me know how to pay.`,
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  // Dual Filtering Engine: Handles both category clicks and text matching
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar Section */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-emerald-600 tracking-wide">
            📦 DeshiMart
          </h1>
          <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
            Customer View
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar Input Element */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search for products (e.g., Honey, Saree)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-shadow shadow-sm"
          />
        </div>

        {/* Category Filters Layout */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {["All", "Grocery", "Clothing", "Electronics"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 w-full bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {product.category}
                </span>
                <h3 className="font-semibold text-gray-800 text-lg mt-1 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-xl font-bold text-gray-900 mt-2">
                  ৳ {product.price}
                </p>
                <button
                  onClick={() =>
                    handleWhatsAppClick(product.title, product.price)
                  }
                  className="w-full mt-4 bg-emerald-600 text-white py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  🟢 Order on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Layout */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm mt-4">
            <p className="text-gray-400 text-lg font-medium">
              No products match your search criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
