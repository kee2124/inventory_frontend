import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard'); // Redirect to the dashboard
  };

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-brown-300 text-white">    
    <div className="max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-brown-800 mb-4">
          Welcome to Inventory Management System
        </h1>
        <p className="text-brown-600 text-center text-lg leading-relaxed mb-6">
          Our simple and efficient inventory management system helps you manage products, track stock levels,
          and calculate the total inventory value with ease. Stay on top of your inventory with real-time updates
          and smart insights.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleGetStarted}
            className="bg-brown-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-brown-500 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
