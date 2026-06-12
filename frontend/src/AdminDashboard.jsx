import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "./Header";

function AdminDashboard() {
  // 1. Core State Notepad: Holds our local list of inventory items
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchProducts = useCallback(
    async (signal) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products`, {
          signal,
        });
        setProducts(response.data);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    },
    [API_BASE_URL],
  );

  // Fetch products on load
  useEffect(() => {
    const controller = new AbortController();

    const initialize = async () => {
      await fetchProducts(controller.signal);
    };

    initialize();
    return () => controller.abort();
  }, [fetchProducts]);

  // 2. Form Input States: Track exactly what the vendor types into each field
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  // 3. Edit Mode Safeguards: Track if we are editing an existing item or adding a new one
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  // 4. Action: Form Submission Handler (Handles both Create and Update operations)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Field Validation Guard
    if (!title || !price || !category || !image) {
      alert("Please fill up all the fields!");
      return;
    }

    const productData = { title, price: Number(price), category, image };

    try {
      if (isEditing) {
        // UPDATE (PUT)
        const response = await axios.put(
          `${API_BASE_URL}/api/products/${currentEditId}`,
          productData,
        );

        if (response.status === 200) {
          console.log("Product updated successfully");
          setIsEditing(false);
          setCurrentEditId(null);
        }
      } else {
        // CREATE (POST)
        const response = await axios.post(
          `${API_BASE_URL}/api/products`,
          productData,
        );

        if (response.status === 201) {
          console.log("Product created successfully");
        }
      }

      // Refresh the list and clear form
      fetchProducts();
      clearForm();
    } catch (error) {
      console.error("Operation failed:", error);
      alert("Action failed. Is the backend running?");
    }
  };

  // 5. Action: Edit Button Trigger (Loads clicked item data values directly back into the inputs)
  const handleEditClick = (product) => {
    setIsEditing(true);
    setCurrentEditId(product._id);
    setTitle(product.title);
    setPrice(product.price);
    setCategory(product.category);
    setImage(product.image);
  };

  // 6. Action: Delete Button Pipeline (Filters out clicked item ID out of state tracker memory)
  const handleDeleteClick = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to remove this product from your shop shelf?",
      )
    ) {
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/api/products/${id}`,
        );
        if (response.status === 200) {
          fetchProducts();
          if (currentEditId === id) clearForm();
        }
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  // Helper routine to reset workspace variables
  const clearForm = () => {
    setTitle("");
    setPrice("");
    setCategory("");
    setImage("");
    setIsEditing(false);
    setCurrentEditId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <div className="h-8"></div>

      <div className="max-w-4xl mx-auto px-6 pb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Hand Column: Dynamic Form Panel */}
        <div className="md:col-span-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {isEditing ? "✏️ Edit Product Details" : "➕ Add New Product"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
                Product Title
              </label>
              <input
                type="text"
                placeholder="e.g., Premium Jamdani Saree"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 text-sm focus:outline-emerald-500 bg-white text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
                Price (BDT)
              </label>
              <input
                type="number"
                placeholder="e.g., 4500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 text-sm focus:outline-emerald-500 bg-white text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 text-sm bg-white text-gray-800 focus:outline-emerald-500"
              >
                <option value="">Select Category</option>
                <option value="Grocery">Grocery</option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
                Image URL
              </label>
              <input
                type="text"
                placeholder="https://unsplash.com..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 text-sm focus:outline-emerald-500 bg-white text-gray-800"
              />
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
              >
                {isEditing ? "💾 Save Changes" : "✨ Add Product to Catalog"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Hand Column: Live Interactive Inventory Stock List Table */}
        <div className="md:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            📋 Current Stock Records ({products.length})
          </h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="py-3 flex justify-between items-center gap-4 transition-all hover:bg-gray-50/50 px-2 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">
                        {product.title}
                      </h4>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                      ৳ {product.price}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-xs font-semibold cursor-pointer transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product._id)}
                        className="text-red-600 hover:bg-red-50 px-2 py-1 rounded text-xs font-semibold cursor-pointer transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-sm font-medium">
                  Your store shelf is completely empty, Adib bhai! Use the left
                  form to add your first product.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
