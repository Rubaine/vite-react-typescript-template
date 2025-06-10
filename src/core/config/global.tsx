export const Config = {
  Urls: {
    // En développement, utilise le proxy Vite (/api), en production utilise l'URL complète
    API: import.meta.env.VITE_API_URL || "http://localhost:5000",
  },
  App: {
    Name: import.meta.env.VITE_APP_NAME || "MyApp",
  },
};
