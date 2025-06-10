import { Config } from "../config/global";
import type { ApiResponse } from "../config/types";

/**
 * ========================
 * API FETCH UTILITIES
 * ========================
 *
 * Ensemble de fonctions utilitaires pour effectuer des requêtes HTTP
 * vers l'API backend avec gestion d'erreurs et types TypeScript.
 *
 * Fonctionnalités incluses :
 * - Gestion automatique des FormData et JSON
 * - Gestion des erreurs réseau et serveur
 * - Types de retour cohérents
 * - Support des headers personnalisés
 * - Fonction utilitaire pour l'authentification
 */

/**
 * Effectue une requête GET vers l'API
 *
 * @template T - Type de données attendu en retour
 * @param route - Route de l'API (ex: '/users', '/posts/123')
 * @param headers - Headers HTTP optionnels (ex: Authorization, Content-Type)
 * @returns Promise<ApiResponse<T>> - Réponse standardisée avec status, data, error, success
 *
 * @example
 * ```tsx
 * // Récupérer une liste d'utilisateurs
 * const response = await getFetch<User[]>('/users');
 * if (response.success) {
 *   console.log(response.data); // User[]
 * }
 *
 * // Avec authentification
 * const response = await getFetch<User>('/profile', withAuth(token));
 * ```
 */
export async function getFetch<T>(
  route: string,
  headers?: Record<string, string>
): Promise<ApiResponse<T>> {
  try {
    // Construction de la requête avec l'URL de base et les headers
    const response = await fetch(`${Config.Urls.API}${route}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers, // Spread des headers personnalisés
      },
    });

    // Vérification du type de contenu de la réponse
    const contentType = response.headers.get("Content-Type") || "";
    const isSuccess = response.status >= 200 && response.status < 300;

    // Traitement des réponses JSON
    if (contentType.includes("application/json")) {
      const responseData = await response.json();
      return {
        status: response.status,
        data: isSuccess ? responseData : null,
        error: !isSuccess
          ? responseData.message || `HTTP ${response.status}`
          : undefined,
        success: isSuccess,
      };
    } else {
      // Gestion des réponses non-JSON (HTML, texte, etc.)
      return {
        status: response.status,
        data: null,
        error: "Received non-JSON response from server",
        success: false,
      };
    }
  } catch (err: any) {
    // Gestion des erreurs réseau (pas de connexion, timeout, etc.)
    console.error("GET fetch error:", err);
    return { status: 500, data: null, error: err.message, success: false };
  }
}

/**
 * Effectue une requête POST vers l'API
 *
 * @template T - Type de données attendu en retour
 * @param route - Route de l'API
 * @param data - Données à envoyer (objet JSON ou FormData)
 * @param headers - Headers HTTP optionnels
 * @returns Promise<ApiResponse<T>> - Réponse standardisée
 *
 * @example
 * ```tsx
 * // Créer un utilisateur avec JSON
 * const response = await postFetch<User>('/users', { name: 'John', email: 'john@example.com' });
 *
 * // Upload de fichier avec FormData
 * const formData = new FormData();
 * formData.append('file', file);
 * const response = await postFetch<UploadResponse>('/upload', formData);
 * ```
 */
export async function postFetch<T>(
  route: string,
  data: any,
  headers?: Record<string, string>
): Promise<ApiResponse<T>> {
  try {
    // Détection automatique du type de données (FormData vs JSON)
    const isFormData = data instanceof FormData;

    const response = await fetch(`${Config.Urls.API}${route}`, {
      method: "POST",
      headers: {
        // Content-Type automatique pour FormData, manuel pour JSON
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...headers,
      },
      // Sérialisation automatique des données
      body: isFormData ? data : JSON.stringify(data),
    });

    const contentType = response.headers.get("Content-Type") || "";
    const isSuccess = response.status >= 200 && response.status < 300;

    if (contentType.includes("application/json")) {
      const responseData = await response.json();
      return {
        status: response.status,
        data: isSuccess ? responseData : null,
        error: !isSuccess
          ? responseData.message || `HTTP ${response.status}`
          : undefined,
        success: isSuccess,
      };
    } else {
      return {
        status: response.status,
        data: null,
        error: "Received non-JSON response from server",
        success: false,
      };
    }
  } catch (err: any) {
    console.error("POST fetch error:", err);
    return { status: 500, data: null, error: err.message, success: false };
  }
}

/**
 * Effectue une requête PUT vers l'API (mise à jour complète)
 *
 * @template T - Type de données attendu en retour
 * @param route - Route de l'API
 * @param data - Données à envoyer
 * @param headers - Headers HTTP optionnels
 * @returns Promise<ApiResponse<T>> - Réponse standardisée
 *
 * @example
 * ```tsx
 * // Mettre à jour un utilisateur
 * const response = await putFetch<User>('/users/123', { name: 'John Updated', email: 'new@example.com' });
 * ```
 */
export async function putFetch<T>(
  route: string,
  data: any,
  headers?: Record<string, string>
): Promise<ApiResponse<T>> {
  try {
    const isFormData = data instanceof FormData;

    const response = await fetch(`${Config.Urls.API}${route}`, {
      method: "PUT",
      headers: {
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...headers,
      },
      body: isFormData ? data : JSON.stringify(data),
    });

    const contentType = response.headers.get("Content-Type") || "";
    const isSuccess = response.status >= 200 && response.status < 300;

    if (contentType.includes("application/json")) {
      const responseData = await response.json();
      return {
        status: response.status,
        data: isSuccess ? responseData : null,
        error: !isSuccess
          ? responseData.message || `HTTP ${response.status}`
          : undefined,
        success: isSuccess,
      };
    } else {
      return {
        status: response.status,
        data: null,
        error: "Received non-JSON response from server",
        success: false,
      };
    }
  } catch (err: any) {
    console.error("PUT fetch error:", err);
    return { status: 500, data: null, error: err.message, success: false };
  }
}

/**
 * Effectue une requête PATCH vers l'API (mise à jour partielle)
 *
 * @template T - Type de données attendu en retour
 * @param route - Route de l'API
 * @param data - Données à envoyer
 * @param headers - Headers HTTP optionnels
 * @returns Promise<ApiResponse<T>> - Réponse standardisée
 *
 * @example
 * ```tsx
 * // Mettre à jour partiellement un utilisateur
 * const response = await patchFetch<User>('/users/123', { name: 'New Name' });
 * ```
 */
export async function patchFetch<T>(
  route: string,
  data: any,
  headers?: Record<string, string>
): Promise<ApiResponse<T>> {
  try {
    const isFormData = data instanceof FormData;

    const response = await fetch(`${Config.Urls.API}${route}`, {
      method: "PATCH",
      headers: {
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...headers,
      },
      body: isFormData ? data : JSON.stringify(data),
    });

    const contentType = response.headers.get("Content-Type") || "";
    const isSuccess = response.status >= 200 && response.status < 300;

    if (contentType.includes("application/json")) {
      const responseData = await response.json();
      return {
        status: response.status,
        data: isSuccess ? responseData : null,
        error: !isSuccess
          ? responseData.message || `HTTP ${response.status}`
          : undefined,
        success: isSuccess,
      };
    } else {
      return {
        status: response.status,
        data: null,
        error: "Received non-JSON response from server",
        success: false,
      };
    }
  } catch (err: any) {
    console.error("PATCH fetch error:", err);
    return { status: 500, data: null, error: err.message, success: false };
  }
}

/**
 * Effectue une requête DELETE vers l'API
 *
 * @template T - Type de données attendu en retour
 * @param route - Route de l'API
 * @param headers - Headers HTTP optionnels
 * @returns Promise<ApiResponse<T>> - Réponse standardisée
 *
 * @example
 * ```tsx
 * // Supprimer un utilisateur
 * const response = await deleteFetch<{ message: string }>('/users/123');
 * if (response.success) {
 *   console.log('Utilisateur supprimé');
 * }
 * ```
 */
export async function deleteFetch<T>(
  route: string,
  headers?: Record<string, string>
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${Config.Urls.API}${route}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    const contentType = response.headers.get("Content-Type") || "";
    const isSuccess = response.status >= 200 && response.status < 300;

    if (contentType.includes("application/json")) {
      const responseData = await response.json();
      return {
        status: response.status,
        data: isSuccess ? responseData : null,
        error: !isSuccess
          ? responseData.message || `HTTP ${response.status}`
          : undefined,
        success: isSuccess,
      };
    } else {
      return {
        status: response.status,
        data: null,
        error: "Received non-JSON response from server",
        success: false,
      };
    }
  } catch (err: any) {
    console.error("DELETE fetch error:", err);
    return { status: 500, data: null, error: err.message, success: false };
  }
}

/**
 * Fonction utilitaire pour ajouter un token d'authentification aux headers
 *
 * @param token - Token d'authentification (JWT, API key, etc.)
 * @param headers - Headers existants à fusionner
 * @returns Record<string, string> - Headers avec Authorization
 *
 * @example
 * ```tsx
 * // Utilisation avec une requête authentifiée
 * const response = await getFetch<User>('/profile', withAuth(userToken));
 *
 * // Avec headers supplémentaires
 * const response = await postFetch<Data>('/data', payload,
 *   withAuth(token, { 'X-Custom-Header': 'value' })
 * );
 * ```
 */
export function withAuth(token: string, headers?: Record<string, string>) {
  return {
    Authorization: `Bearer ${token}`,
    ...headers,
  };
}
