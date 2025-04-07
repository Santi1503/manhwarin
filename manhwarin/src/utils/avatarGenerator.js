/**
 * Genera una URL de avatar basada en un nombre de usuario
 * Utiliza el servicio dicebear para generar avatares únicos
 * 
 * @param {string} username - El nombre de usuario para generar el avatar
 * @returns {string} - URL del avatar generado
 */
export const generateAvatar = (username) => {
  // Codificar el nombre de usuario para usarlo en la URL
  const encodedUsername = encodeURIComponent(username);
  
  // Generar un avatar usando el servicio dicebear
  // Puedes cambiar el estilo del avatar cambiando 'adventurer' por otros estilos como:
  // 'avataaars', 'bottts', 'fun-emoji', 'personas', 'pixel-art', etc.
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodedUsername}&backgroundColor=b6e3f4,c0aede,d1f4d9,ffdfbf,ffd5dc`;
}; 