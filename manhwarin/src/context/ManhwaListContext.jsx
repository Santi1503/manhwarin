import React, { createContext, useState, useContext, useEffect } from 'react';

// Definir las categorías de listas
export const LIST_CATEGORIES = {
  READING: 'reading',
  COMPLETED: 'completed',
  DROPPED: 'dropped',
  PLAN_TO_READ: 'planToRead'
};

// Nombres en español para las categorías
export const CATEGORY_NAMES = {
  [LIST_CATEGORIES.READING]: 'Leyendo',
  [LIST_CATEGORIES.COMPLETED]: 'Leídos',
  [LIST_CATEGORIES.DROPPED]: 'Abandonados',
  [LIST_CATEGORIES.PLAN_TO_READ]: 'Guardar para leer después'
};

const ManhwaListContext = createContext();

export const ManhwaListProvider = ({ children }) => {
  // Estado para almacenar las listas de manhwas
  const [manhwaLists, setManhwaLists] = useState({
    [LIST_CATEGORIES.READING]: [],
    [LIST_CATEGORIES.COMPLETED]: [],
    [LIST_CATEGORIES.DROPPED]: [],
    [LIST_CATEGORIES.PLAN_TO_READ]: []
  });

  // Cargar las listas desde localStorage al iniciar
  useEffect(() => {
    const savedLists = localStorage.getItem('manhwaLists');
    if (savedLists) {
      setManhwaLists(JSON.parse(savedLists));
    }
  }, []);

  // Guardar las listas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('manhwaLists', JSON.stringify(manhwaLists));
  }, [manhwaLists]);

  // Añadir un manhwa a una categoría
  const addToCategory = (manhwa, category) => {
    // Verificar si el manhwa ya está en alguna categoría
    const allManhwas = Object.values(manhwaLists).flat();
    const existingManhwa = allManhwas.find(m => m.titleNo === manhwa.titleNo);
    
    if (existingManhwa) {
      // Si ya existe, eliminarlo de su categoría actual
      const currentCategory = Object.keys(manhwaLists).find(cat => 
        manhwaLists[cat].some(m => m.titleNo === manhwa.titleNo)
      );
      
      if (currentCategory) {
        setManhwaLists(prev => ({
          ...prev,
          [currentCategory]: prev[currentCategory].filter(m => m.titleNo !== manhwa.titleNo)
        }));
      }
    }
    
    // Añadir a la nueva categoría
    setManhwaLists(prev => ({
      ...prev,
      [category]: [...prev[category], manhwa]
    }));
  };

  // Eliminar un manhwa de una categoría
  const removeFromCategory = (manhwaId, category) => {
    setManhwaLists(prev => ({
      ...prev,
      [category]: prev[category].filter(manhwa => manhwa.titleNo !== manhwaId)
    }));
  };

  // Obtener todos los manhwas de una categoría
  const getManhwasByCategory = (category) => {
    return manhwaLists[category] || [];
  };

  // Verificar si un manhwa está en una categoría
  const isInCategory = (manhwaId, category) => {
    return manhwaLists[category].some(manhwa => manhwa.titleNo === manhwaId);
  };

  // Obtener la categoría de un manhwa
  const getManhwaCategory = (manhwaId) => {
    for (const category of Object.keys(manhwaLists)) {
      if (manhwaLists[category].some(manhwa => manhwa.titleNo === manhwaId)) {
        return category;
      }
    }
    return null;
  };

  return (
    <ManhwaListContext.Provider
      value={{
        manhwaLists,
        addToCategory,
        removeFromCategory,
        getManhwasByCategory,
        isInCategory,
        getManhwaCategory
      }}
    >
      {children}
    </ManhwaListContext.Provider>
  );
};

export const useManhwaList = () => {
  const context = useContext(ManhwaListContext);
  if (!context) {
    throw new Error('useManhwaList debe ser usado dentro de un ManhwaListProvider');
  }
  return context;
};

export default ManhwaListContext; 