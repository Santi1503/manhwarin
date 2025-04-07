import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { manhwaService } from '../services/manhwaService';
import AddToListButton from '../components/AddToListButton';

// Función para decodificar entidades HTML
const decodeHtmlEntities = (text) => {
  if (!text) return '';
  
  // Crear un elemento temporal para decodificar las entidades HTML
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

const ManhwaDetail = () => {
  const { id } = useParams();
  const [manhwa, setManhwa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info'); // 'info', 'chapters', 'comments'

  useEffect(() => {
    const fetchManhwaDetails = async () => {
      try {
        setLoading(true);
        const data = await manhwaService.getManhwaInfo(id, 'es');
        
        if (data && data.message && data.message.result) {
          setManhwa(data.message.result);
        } else {
          setError('No se pudo cargar la información del manhwa');
        }
      } catch (err) {
        console.error('Error al cargar detalles del manhwa:', err);
        setError('Error al cargar los detalles del manhwa');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchManhwaDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">Cargando información del manhwa...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8 text-red-500">{error}</div>
        <div className="text-center">
          <Link to="/" className="text-blue-500 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!manhwa) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">No se encontró el manhwa</div>
        <div className="text-center">
          <Link to="/" className="text-blue-500 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  // Decodificar textos con entidades HTML
  const decodedTitle = decodeHtmlEntities(manhwa.title);
  const decodedSynopsis = decodeHtmlEntities(manhwa.synopsis);
  const decodedGenre = decodeHtmlEntities(manhwa.representGenre);
  const decodedAuthor = decodeHtmlEntities(manhwa.writingAuthorName);

  // Preparar el objeto manhwa para el botón de añadir a lista
  const manhwaForList = {
    titleNo: manhwa.titleNo,
    title: decodedTitle,
    writingAuthorName: decodedAuthor,
    representGenre: decodedGenre,
    thumbnail: manhwa.thumbnail,
    starScoreAverage: manhwa.starScoreAverage || 0
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado del manhwa */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Información principal */}
            <div className="flex-grow">
              <div className="mb-4">
                <span 
                  className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                  style={{ backgroundColor: manhwa.genreColor ? `#${manhwa.genreColor}40` : 'rgba(59, 130, 246, 0.1)', color: manhwa.genreColor ? `#${manhwa.genreColor}` : '#3b82f6' }}
                >
                  {decodedGenre}
                </span>
                <div className="mt-4 flex items-center justify-between">
                  <h1 className="text-3xl font-bold">{decodedTitle}</h1>
                  <AddToListButton manhwa={manhwaForList} />
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <span className="mr-4">Autor: {decodedAuthor}</span>
                <span className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{manhwa.starScoreAverage?.toFixed(1) || 'N/A'}</span>
                </span>
              </div>
              
              <p className="text-gray-700 mb-4">{decodedSynopsis}</p>
            </div>
            
            {/* Imagen de portada */}
            <div className="w-full md:w-1/3">
              <img
                src={manhwa.thumbnail}
                alt={decodedTitle}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Pestañas de navegación */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'info'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('info')}
            >
              Información
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'chapters'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('chapters')}
            >
              Capítulos
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'comments'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('comments')}
            >
              Comentarios
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'info' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Detalles adicionales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Información del autor</h3>
                  <p className="text-gray-700">
                    {decodedAuthor} es el autor de {decodedTitle}. 
                    {manhwa.writingAuthorName !== manhwa.drawingAuthorName && 
                      ` ${decodeHtmlEntities(manhwa.drawingAuthorName)} es el artista.`}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Estadísticas</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Puntuación promedio: {manhwa.starScoreAverage}</li>
                    <li>Número de lecturas: {manhwa.readCount.toLocaleString()}</li>
                    <li>Número de episodios: {manhwa.totalServiceEpisodeCount}</li>
                    <li>Estado: {manhwa.publishStatus === 'COMPLETE' ? 'Completado' : 'En emisión'}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'chapters' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Capítulos</h2>
              <div className="text-center py-8 text-gray-500">
                La lista de capítulos se cargará próximamente.
              </div>
            </div>
          )}
          
          {activeTab === 'comments' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Comentarios</h2>
              <div className="text-center py-8 text-gray-500">
                Los comentarios se cargarán próximamente.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManhwaDetail; 