import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isStore = location.pathname === "/";
  const isAdmin = location.pathname === "/admin";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-xl font-bold text-emerald-600 tracking-wide">
            📦 DeshiMart
          </h1>
        </Link>
        <div className="flex gap-2">
          <Link
            to="/"
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors shadow-sm ${
              isStore
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Store View
          </Link>
          <Link
            to="/admin"
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors shadow-sm ${
              isAdmin
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
