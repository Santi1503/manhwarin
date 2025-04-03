import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">ManhwaRin</h1>
        </nav>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <footer className="bg-white shadow mt-8">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-gray-600">© 2025 ManhwaRin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 