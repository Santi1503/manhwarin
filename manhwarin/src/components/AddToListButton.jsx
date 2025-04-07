import React, { useState } from 'react';
import { useManhwaList, LIST_CATEGORIES, CATEGORY_NAMES } from '../context/ManhwaListContext';

const AddToListButton = ({ manhwa }) => {
  const { addToCategory, isInCategory, getManhwaCategory } = useManhwaList();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentCategory = getManhwaCategory(manhwa.titleNo);
  
  const handleAddToList = (category) => {
    addToCategory(manhwa, category);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-md transition-colors ${
          currentCategory
            ? 'bg-green-500 text-white'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {currentCategory ? CATEGORY_NAMES[currentCategory] : 'Añadir a lista'}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            {Object.keys(LIST_CATEGORIES).map((key) => (
              <button
                key={key}
                onClick={() => handleAddToList(LIST_CATEGORIES[key])}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentCategory === LIST_CATEGORIES[key]
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {CATEGORY_NAMES[LIST_CATEGORIES[key]]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToListButton; 