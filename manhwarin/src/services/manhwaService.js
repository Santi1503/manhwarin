import api from './api';

export const manhwaService = {
  // Obtener lista de manhwas
  getManhwaList: async (genre = 'ALL', sortOrder = 'READ_COUNT', startIndex = 0, pageSize = 20, language = 'es') => {
    const response = await api.get('/canvas/titles/list', {
      params: {
        genre,
        sortOrder,
        startIndex,
        pageSize,
        language
      }
    });
    return response.data;
  },

  // Buscar manhwas
  searchManhwas: async (query, page = 0, pageSize = 20, language = 'es') => {
    const response = await api.get('/canvas/search', {
      params: {
        startIndex: page * pageSize,
        query,
        pageSize,
        language
      }
    });
    return response.data;
  },

  // Obtener detalles de un manhwa
  getManhwaById: async (id) => {
    const response = await api.get(`/canvas/detail/${id}`);
    return response.data;
  },

  // Obtener capítulos de un manhwa
  getChapters: async (id) => {
    const response = await api.get(`/canvas/chapters/${id}`);
    return response.data;
  },

  // Obtener un capítulo específico
  getChapter: async (id, chapterId) => {
    const response = await api.get(`/canvas/chapter/${id}/${chapterId}`);
    return response.data;
  },

  // Obtener manhwas populares
  getPopularManhwas: async (page = 0, pageSize = 20, language = 'es') => {
    const response = await api.get('/canvas/popular', {
      params: {
        startIndex: page * pageSize,
        pageSize,
        language
      }
    });
    return response.data;
  },

  // Obtener manhwas recientes
  getRecentManhwas: async (page = 0, pageSize = 20, language = 'es') => {
    const response = await api.get('/canvas/recent', {
      params: {
        startIndex: page * pageSize,
        pageSize,
        language
      }
    });
    return response.data;
  }
}; 