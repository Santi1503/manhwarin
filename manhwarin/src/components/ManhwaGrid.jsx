import React from 'react';
import { Link } from 'react-router-dom';

// Función para decodificar entidades HTML
const decodeHtmlEntities = (text) => {
  if (!text) return '';
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

const ManhwaGrid = ({ manhwas }) => {
  if (!manhwas || manhwas.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No hay manhwas disponibles.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {manhwas.map((manhwa) => (
        <Link
          key={manhwa.titleNo}
          to={`/manhwa/${manhwa.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <div className="mb-2">
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: manhwa.genreColor ? `#${manhwa.genreColor}40` : 'rgba(59, 130, 246, 0.1)',
                  color: manhwa.genreColor ? `#${manhwa.genreColor}` : '#3b82f6'
                }}
              >
                {decodeHtmlEntities(manhwa.representGenre)}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {decodeHtmlEntities(manhwa.title)}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-4">
              {decodeHtmlEntities(manhwa.synopsis)}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                {manhwa.starScoreAverage}
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {manhwa.totalServiceEpisodeCount} eps
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {manhwa.readCount.toLocaleString()}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ManhwaGrid; 