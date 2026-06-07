import React from "react";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      {/* 1. Header Context Section */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            📦 DeshiMart Control Panel
          </h1>
          <p className="text-sm text-gray-500">
            Manage your shop inventory items
          </p>
        </div>
        <button className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-semibold border border-emerald-200 cursor-pointer">
          🔗 View Public Store
        </button>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 2. Left Column: Add Product Form Skeleton */}
        <div className="md:col-span-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            ➕ Add New Product
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Product Title
              </label>
              <input
                type="text"
                placeholder="e.g., Premium Jamdani Saree"
                className="w-full p-2.5 rounded-lg border border-gray-200 text-sm focus:outline-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Price (BDT)
              </label>
              <input
                type="number"
                placeholder="e.g., 4500"
                className="w-full p-2.5 rounded-lg border border-gray-200 text-sm focus:outline-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Category
              </label>
              <select className="w-full p-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-emerald-500">
                <option value="">Select Category</option>
                <option value="Grocery">Grocery</option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Image URL
              </label>
              <input
                type="text"
                placeholder="https://unsplash.com..."
                className="w-full p-2.5 rounded-lg border border-gray-200 text-sm focus:outline-emerald-500"
              />
            </div>

            <button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors cursor-pointer">
              ✨ Add Product to Catalog
            </button>
          </div>
        </div>

        {/* 3. Right Column: Inventory Management Table Skeleton */}
        <div className="md:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            📋 Current Stock Records
          </h2>

          <div className="divide-y divide-gray-100">
            {/* Mock Item Row 1 */}
            <div className="py-3 flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">
                    Premium Sundarban Honey
                  </h4>
                  <span className="text-xs text-gray-400 font-medium uppercase">
                    Grocery
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900 text-sm">৳ 450</span>
                <div className="flex gap-1">
                  <button className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-xs font-semibold cursor-pointer">
                    ✏️ Edit
                  </button>
                  <button className="text-red-600 hover:bg-red-50 px-2 py-1 rounded text-xs font-semibold cursor-pointer">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Mock Item Row 2 */}
            <div className="py-3 flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">
                    Traditional Handloom Saree
                  </h4>
                  <span className="text-xs text-gray-400 font-medium uppercase">
                    Clothing
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900 text-sm">৳ 2,500</span>
                <div className="flex gap-1">
                  <button className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-xs font-semibold cursor-pointer">
                    ✏️ Edit
                  </button>
                  <button className="text-red-600 hover:bg-red-50 px-2 py-1 rounded text-xs font-semibold cursor-pointer">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
