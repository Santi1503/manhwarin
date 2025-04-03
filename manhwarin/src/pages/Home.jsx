import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { manhwaService } from '../services/manhwaService';

// Función para decodificar entidades HTML
const decodeHtmlEntities = (text) => {
  if (!text) return '';
  
  // Crear un elemento temporal para decodificar las entidades HTML
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

// Función para obtener una URL de imagen a través de un proxy
const getProxiedImageUrl = (originalUrl) => {
  if (!originalUrl) return null;
  
  // Usar un servicio de proxy de imágenes
  // Opción 1: ImgBB (requiere API key)
  // return `https://api.imgbb.com/1/upload?key=YOUR_API_KEY&url=${encodeURIComponent(originalUrl)}`;
  
  // Opción 2: CORS Anywhere (servicio gratuito)
  return `https://cors-anywhere.herokuapp.com/${originalUrl}`;
  
  // Opción 3: AllOrigins (servicio gratuito)
  // return `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`;
};

// Componente para mostrar una tarjeta de manhwa
const ManhwaCard = ({ manhwa }) => {
  // Decodificar los textos que pueden contener entidades HTML
  const decodedTitle = decodeHtmlEntities(manhwa.title);
  const decodedSynopsis = decodeHtmlEntities(manhwa.synopsis);
  const decodedGenre = decodeHtmlEntities(manhwa.representGenre);
  
  return (
    <Link 
      to={`/manhwa/${manhwa.titleNo}`} 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
    >
      <div className="p-6 flex-grow">
        <div className="mb-4">
          <span 
            className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
            style={{ backgroundColor: manhwa.genreColor ? `#${manhwa.genreColor}40` : 'rgba(59, 130, 246, 0.1)', color: manhwa.genreColor ? `#${manhwa.genreColor}` : '#3b82f6' }}
          >
            {decodedGenre}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 line-clamp-1">{decodedTitle}</h3>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            {manhwa.starScoreAverage}
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {manhwa.readCount.toLocaleString()}
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {manhwa.totalServiceEpisodeCount} episodios
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-4">{decodedSynopsis}</p>
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {manhwa.writingAuthorName}
          </span>
          <span className="text-xs font-medium text-blue-600">
            Ver detalles →
          </span>
        </div>
      </div>
    </Link>
  );
};

// Componente para mostrar una sección de manhwas
const ManhwaSection = ({ title, manhwas }) => {
  if (!manhwas || manhwas.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {manhwas.map((manhwa) => (
          <ManhwaCard key={manhwa.id} manhwa={manhwa} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [manhwas, setManhwas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchManhwas = async (pageNum = 0) => {
    try {
      setLoading(true);
      const data = await manhwaService.getManhwaList(
        'ALL', 
        'READ_COUNT', 
        pageNum * 20, 
        20, 
        'es'
      );
      
      console.log('Datos recibidos de la API:', data);
      
      // Extraer los títulos de la estructura específica de la API
      let titles = [];
      let total = 0;
      
      if (data && data.message && data.message.result && data.message.result.titleList) {
        titles = data.message.result.titleList.titles || [];
        total = data.message.result.totalCount || 0;
      }
      
      console.log('Títulos extraídos:', titles);
      console.log('Total de títulos:', total);
      
      if (pageNum === 0) {
        setManhwas(titles);
      } else {
        setManhwas(prev => [...prev, ...titles]);
      }
      
      setTotalCount(total);
      setHasMore(titles.length === 20 && (pageNum * 20 + titles.length) < total);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar los manhwas');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManhwas();
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchManhwas(nextPage);
    }
  };

  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manhwas Populares</h1>
      
      {manhwas.length === 0 && loading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : manhwas.length === 0 ? (
        <div className="text-center py-8">No se encontraron manhwas</div>
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            Mostrando {manhwas.length} de {totalCount} manhwas
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {manhwas.map((manhwa) => (
              <ManhwaCard key={manhwa.titleNo} manhwa={manhwa} />
            ))}
          </div>
          
          {hasMore && (
            <div className="text-center mt-8">
              <button 
                onClick={loadMore} 
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                {loading ? 'Cargando...' : 'Cargar más'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home; 