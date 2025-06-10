import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

export default function ProtectedRoute() {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const { token, verifyToken, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        await verifyToken(token);
      }
      setIsChecking(false);
    };

    if (!loading) {
      checkAuth();
    }
  }, [token, loading, verifyToken]);

  // Attendre que l'AuthProvider et la vérification soient terminés
  if (loading || isChecking) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Chargement...</span>
      </Spinner>
    );
  }

  // Si pas de token ou pas authentifié, rediriger vers la page d'accueil
  if (!token || !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
