import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={currentUser.photoURL}
          alt="Avatar"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">{currentUser.displayName}</h2>
          <p className="text-gray-600">{currentUser.email}</p>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Información de la cuenta</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ID de usuario
            </label>
            <p className="mt-1 text-sm text-gray-900">{currentUser.uid}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de creación
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(currentUser.metadata.creationTime).toLocaleDateString()}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Último inicio de sesión
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(currentUser.metadata.lastSignInTime).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Profile; 