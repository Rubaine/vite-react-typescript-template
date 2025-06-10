/**
 * ========================
 * TYPES CENTRALISÉS
 * ========================
 * 
 * Définitions TypeScript centralisées pour toute l'application.
 * Ce fichier contient tous les types utilisés dans le template.
 */

// ========================
// API TYPES
// ========================

/**
 * Interface de réponse standardisée pour toutes les requêtes API
 */
export interface ApiResponse<T> {
  status: number;
  data: T | null;
  error?: string;
  success: boolean;
}

// ========================
// USER & AUTH TYPES
// ========================

/**
 * Interface utilisateur de base
 * Peut être étendue selon les besoins du projet
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  [key: string]: any; // Permet d'ajouter d'autres propriétés
}

/**
 * Configuration du système d'authentification
 */
export interface AuthConfig {
  endpoints: {
    verify: string;
    refresh?: string;
  };
  storage: {
    tokenKey: string;
    refreshTokenKey?: string;
    userKey?: string;
  };
  autoVerify: boolean;
}

/**
 * Interface du contexte d'authentification
 */
export interface AuthContext {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  login: (token: string, refreshToken?: string, user?: User) => void;
  logout: () => void;
  verifyToken: (token?: string) => Promise<boolean>;
  refreshAccessToken: () => Promise<boolean>;
  updateUser: (user: User) => void;
  loading: boolean;
  config: AuthConfig;
}

// ========================
// REACT TYPES
// ========================

/**
 * Props de base pour les composants avec children
 */
export interface WithChildren {
  children: React.ReactNode;
}