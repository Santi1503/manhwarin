import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { manhwaService } from '../services/manhwaService';

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
              </div>
              
              <h1 className="text-3xl font-bold mb-3">{decodedTitle}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
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
                  {manhwa.readCount.toLocaleString()} lecturas
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {manhwa.totalServiceEpisodeCount} episodios
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {decodedAuthor}
                </span>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Sinopsis</h2>
                <p className="text-gray-700 whitespace-pre-line">{decodedSynopsis}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  Leer ahora
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">
                  Añadir a favoritos
                </button>
              </div>
            </div>
            
            {/* Información adicional */}
            <div className="w-full md:w-64 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Información</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Estado:</span>
                  <span className="font-medium">{manhwa.publishStatus === 'COMPLETE' ? 'Completado' : 'En emisión'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Género:</span>
                  <span className="font-medium">{decodedGenre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Autor:</span>
                  <span className="font-medium">{decodedAuthor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Episodios:</span>
                  <span className="font-medium">{manhwa.totalServiceEpisodeCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Puntuación:</span>
                  <span className="font-medium">{manhwa.starScoreAverage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Lecturas:</span>
                  <span className="font-medium">{manhwa.readCount.toLocaleString()}</span>
                </div>
              </div>
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