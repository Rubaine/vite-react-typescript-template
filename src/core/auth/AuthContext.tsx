import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getFetch, withAuth } from "../api/fetch";
import type { AuthConfig, AuthContext, User } from "../config/types";

/**
 * ========================
 * AUTHENTICATION CONTEXT
 * ========================
 *
 * Système d'authentification complet avec :
 * - Gestion des tokens JWT (access + refresh)
 * - Persistance dans localStorage
 * - Vérification automatique des tokens
 * - Configuration personnalisable
 * - Gestion des données utilisateur
 *
 * Ce contexte fournit toutes les fonctionnalités d'auth nécessaires
 * pour une application React moderne.
 */

/**
 * Configuration par défaut de l'authentification
 * Peut être surchargée via les props du AuthProvider
 */
const defaultAuthConfig: AuthConfig = {
  endpoints: {
    verify: "/auth/me", // Endpoint pour vérifier le token
    refresh: "/auth/refresh", // Endpoint pour renouveler le token
  },
  storage: {
    tokenKey: "authToken", // Clé localStorage pour le token principal
    refreshTokenKey: "refreshToken", // Clé localStorage pour le refresh token
    userKey: "user", // Clé localStorage pour les données utilisateur
  },
  autoVerify: true, // Vérifie automatiquement le token au chargement
};

// Création du contexte React
const AuthContext = createContext<AuthContext | undefined>(undefined);

/**
 * Props du composant AuthProvider
 */
interface AuthProviderProps {
  children: ReactNode;
  config?: Partial<AuthConfig>; // Configuration personnalisée optionnelle
}

/**
 * Provider d'authentification principal
 *
 * @param children - Composants enfants qui auront accès au contexte
 * @param config - Configuration personnalisée (fusionnée avec la config par défaut)
 *
 * @example
 * ```tsx
 * // Utilisation basique
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 *
 * // Avec configuration personnalisée
 * <AuthProvider config={{
 *   endpoints: { verify: '/api/auth/me' },
 *   autoVerify: false
 * }}>
 *   <App />
 * </AuthProvider>
 * ```
 */
export function AuthProvider({
  children,
  config: customConfig,
}: AuthProviderProps) {
  // Fusion de la configuration par défaut avec la configuration personnalisée
  const config = { ...defaultAuthConfig, ...customConfig };

  // ========================
  // STATE MANAGEMENT
  // ========================

  const [token, setToken] = useState<string | null>(null); // Token d'accès principal
  const [refreshToken, setRefreshToken] = useState<string | null>(null); // Token de renouvellement
  const [user, setUser] = useState<User | null>(null); // Données utilisateur
  const [loading, setLoading] = useState(true); // État de chargement initial
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État d'authentification

  /**
   * Effect d'initialisation - Se déclenche au montage du composant
   * Récupère les données d'authentification depuis localStorage
   * et lance la vérification du token si configurée
   */
  useEffect(() => {
    // Récupération des données sauvegardées
    const savedToken = localStorage.getItem(config.storage.tokenKey);
    const savedRefreshToken = localStorage.getItem(
      config.storage.refreshTokenKey || ""
    );
    const savedUser = localStorage.getItem(config.storage.userKey || "");

    if (savedToken) {
      // Restauration du token principal
      setToken(savedToken);

      // Restauration du refresh token si présent
      if (savedRefreshToken) setRefreshToken(savedRefreshToken);

      // Restauration des données utilisateur si présentes
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.warn("Failed to parse saved user data");
        }
      }

      // Vérification automatique du token si activée
      if (config.autoVerify) {
        verifyToken(savedToken);
      } else {
        // Sinon, considère l'utilisateur comme authentifié
        setIsAuthenticated(true);
        setLoading(false);
      }
    } else {
      // Pas de token sauvegardé, fin du chargement
      setLoading(false);
    }
  }, []);

  // ========================
  // AUTHENTICATION METHODS
  // ========================

  /**
   * Connecte un utilisateur avec un token
   *
   * @param newToken - Token d'accès principal (requis)
   * @param newRefreshToken - Token de renouvellement (optionnel)
   * @param newUser - Données utilisateur (optionnel)
   *
   * @example
   * ```tsx
   * const { login } = useAuth();
   *
   * // Login basique avec token seulement
   * login(accessToken);
   *
   * // Login complet avec toutes les données
   * login(accessToken, refreshToken, userData);
   * ```
   */
  const login = (
    newToken: string,
    newRefreshToken?: string,
    newUser?: User
  ) => {
    // Mise à jour des états
    setToken(newToken);
    setIsAuthenticated(true);

    // Sauvegarde du token principal
    localStorage.setItem(config.storage.tokenKey, newToken);

    // Sauvegarde du refresh token si fourni
    if (newRefreshToken) {
      setRefreshToken(newRefreshToken);
      localStorage.setItem(config.storage.refreshTokenKey!, newRefreshToken);
    }

    // Sauvegarde des données utilisateur si fournies
    if (newUser) {
      setUser(newUser);
      localStorage.setItem(config.storage.userKey!, JSON.stringify(newUser));
    }
  };

  /**
   * Déconnecte l'utilisateur et nettoie toutes les données
   *
   * @example
   * ```tsx
   * const { logout } = useAuth();
   *
   * const handleLogout = () => {
   *   logout();
   *   navigate('/login');
   * };
   * ```
   */
  const logout = () => {
    // Nettoyage des états
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    setIsAuthenticated(false);

    // Nettoyage du localStorage
    localStorage.removeItem(config.storage.tokenKey);
    if (config.storage.refreshTokenKey) {
      localStorage.removeItem(config.storage.refreshTokenKey);
    }
    if (config.storage.userKey) {
      localStorage.removeItem(config.storage.userKey);
    }
  };

  /**
   * Met à jour les données utilisateur
   *
   * @param updatedUser - Nouvelles données utilisateur
   *
   * @example
   * ```tsx
   * const { updateUser } = useAuth();
   *
   * const handleProfileUpdate = (newData) => {
   *   updateUser({ ...user, ...newData });
   * };
   * ```
   */
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    if (config.storage.userKey) {
      localStorage.setItem(config.storage.userKey, JSON.stringify(updatedUser));
    }
  };

  /**
   * Vérifie la validité d'un token auprès du serveur
   *
   * @param tokenToVerify - Token à vérifier (utilise le token actuel si non fourni)
   * @returns Promise<boolean> - true si le token est valide
   *
   * @example
   * ```tsx
   * const { verifyToken } = useAuth();
   *
   * const checkAuth = async () => {
   *   const isValid = await verifyToken();
   *   if (!isValid) {
   *     // Rediriger vers login
   *   }
   * };
   * ```
   */
  const verifyToken = async (tokenToVerify?: string): Promise<boolean> => {
    const currentToken = tokenToVerify || token;
    if (!currentToken) {
      setLoading(false);
      return false;
    }
    try {
      // Appel à l'endpoint de vérification avec le token
      const response = await getFetch<User>(
        config.endpoints.verify,
        withAuth(currentToken)
      );

      if (response.success && response.data) {
        // Token valide - mise à jour des états
        setIsAuthenticated(true);
        setUser(response.data);
        setLoading(false);

        // Sauvegarde des données utilisateur mises à jour
        if (config.storage.userKey) {
          localStorage.setItem(
            config.storage.userKey,
            JSON.stringify(response.data)
          );
        }

        return true;
      } else {
        // Token invalide - tentative de refresh si disponible
        if (refreshToken && config.endpoints.refresh) {
          const refreshSuccess = await refreshAccessToken();
          if (refreshSuccess) return true;
        }

        // Échec total - déconnexion
        setIsAuthenticated(false);
        setLoading(false);
        logout();
        return false;
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      setIsAuthenticated(false);
      setLoading(false);
      logout();
      return false;
    }
  };

  /**
   * Renouvelle le token d'accès avec le refresh token
   *
   * @returns Promise<boolean> - true si le renouvellement a réussi
   *
   * @example
   * ```tsx
   * const { refreshAccessToken } = useAuth();
   *
   * // Renouvellement manuel
   * const renewed = await refreshAccessToken();
   * ```
   */
  const refreshAccessToken = async (): Promise<boolean> => {
    if (!refreshToken || !config.endpoints.refresh) {
      return false;
    }
    try {
      // Appel à l'endpoint de refresh
      const response = await getFetch<{
        token: string;
        refreshToken?: string;
        user?: User;
      }>(config.endpoints.refresh, withAuth(refreshToken));

      if (response.success && response.data) {
        const {
          token: newToken,
          refreshToken: newRefreshToken,
          user: newUser,
        } = response.data;

        // Mise à jour avec les nouveaux tokens
        setToken(newToken);
        localStorage.setItem(config.storage.tokenKey, newToken);

        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
          localStorage.setItem(
            config.storage.refreshTokenKey!,
            newRefreshToken
          );
        }

        if (newUser) {
          setUser(newUser);
          localStorage.setItem(
            config.storage.userKey!,
            JSON.stringify(newUser)
          );
        }

        setIsAuthenticated(true);
        return true;
      } else {
        // Échec du refresh - déconnexion complète
        logout();
        return false;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
      return false;
    }
  };

  // ========================
  // CONTEXT VALUE
  // ========================

  /**
   * Valeur du contexte exposée aux composants enfants
   */ const value = {
    isAuthenticated, // État d'authentification
    token, // Token d'accès actuel
    refreshToken, // Refresh token actuel
    user, // Données utilisateur
    login, // Fonction de connexion
    logout, // Fonction de déconnexion
    verifyToken, // Fonction de vérification
    refreshAccessToken, // Fonction de renouvellement
    updateUser, // Fonction de mise à jour utilisateur
    loading, // État de chargement
    config, // Configuration actuelle
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook personnalisé pour accéder au contexte d'authentification
 *
 * @returns AuthContextType - Toutes les fonctions et états d'authentification
 * @throws Error si utilisé en dehors d'un AuthProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isAuthenticated, user, logout } = useAuth();
 *
 *   if (!isAuthenticated) {
 *     return <LoginForm />;
 *   }
 *
 *   return (
 *     <div>
 *       <h1>Bonjour {user?.name}</h1>
 *       <button onClick={logout}>Se déconnecter</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
