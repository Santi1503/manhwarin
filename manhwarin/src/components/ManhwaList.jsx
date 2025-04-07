import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useManhwaList, LIST_CATEGORIES, CATEGORY_NAMES } from '../context/ManhwaListContext';

const ManhwaList = ({ category }) => {
  const { getManhwasByCategory, removeFromCategory } = useManhwaList();
  const [activeTab, setActiveTab] = useState(category || LIST_CATEGORIES.READING);
  
  const manhwas = getManhwasByCategory(activeTab);
  
  const handleRemove = (manhwaId) => {
    removeFromCategory(manhwaId, activeTab);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        {Object.keys(LIST_CATEGORIES).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(LIST_CATEGORIES[key])}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === LIST_CATEGORIES[key]
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {CATEGORY_NAMES[LIST_CATEGORIES[key]]}
          </button>
        ))}
      </div>
      
      {manhwas.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay manhwas en esta lista
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manhwas.map((manhwa) => (
            <div
              key={manhwa.titleNo}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex">
                <div className="w-1/3">
                  <img
                    src={manhwa.thumbnail}
                    alt={manhwa.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <Link
                    to={`/manhwa/${manhwa.titleNo}`}
                    className="text-lg font-semibold hover:text-blue-500 transition-colors"
                  >
                    {manhwa.title}
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    {manhwa.writingAuthorName}
                  </p>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-blue-500 mr-2">{manhwa.representGenre}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{manhwa.starScoreAverage.toFixed(1)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(manhwa.titleNo)}
                    className="mt-3 text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    Eliminar de la lista
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManhwaList; 