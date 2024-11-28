// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-beige-100 shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo or App Name */}
        <h1 className="text-xl font-semibold text-brown-800">KEE's Inventory</h1>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6 text-sm text-brown-600">
            
            <li>
              <Link to="/dashboard" className="hover:text-brown-900 transition-colors">Dashboard</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-brown-900 transition-colors">Products</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
