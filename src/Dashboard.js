import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalInventoryValue: 0,
    lowStockProducts: 0,
  });

  useEffect(() => {
    // Fetch dashboard data from the backend
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold mb-4">Dashboard</h1><br/><br/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-medium">Total Products</h2>
          <p className="text-2xl">{dashboardData.totalProducts}</p>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-medium">Total Inventory Value</h2>
          <p className="text-2xl">{dashboardData.totalInventoryValue.toFixed(2)}</p>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-medium">Low Stock Products</h2>
          <p className="text-2xl">{dashboardData.lowStockProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
