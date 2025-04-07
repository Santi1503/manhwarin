import React from 'react';
import ManhwaList from '../components/ManhwaList';
import { LIST_CATEGORIES } from '../context/ManhwaListContext';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">Mi Perfil</h1>
          <div className="flex items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden mr-6">
              <img
                src="https://via.placeholder.com/150"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Usuario</h2>
              <p className="text-gray-600">Miembro desde 2025</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Mis Listas</h2>
        <ManhwaList />
      </div>
    </div>
  );
};

export default ProfilePage; 