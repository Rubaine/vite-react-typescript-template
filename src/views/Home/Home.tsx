export default function Home() {
  return (
    // Composants temporaires pour le template
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="text-center mb-5">
            <h1 className="display-4">🚀 Template React + TypeScript + Vite</h1>
            <p className="lead text-muted">
              Template professionnel avec authentification JWT et client API
              intégré
            </p>
          </div>

          {/* Quick Start */}
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="h5 mb-0">⚡ Quick Start</h3>
            </div>
            <div className="card-body">
              <ol className="mb-0">
                <li className="mb-2">
                  Configurez votre fichier <code>.env</code> avec votre{" "}
                  <code>VITE_API_URL</code>
                </li>
                <li className="mb-2">
                  Adaptez les endpoints dans{" "}
                  <code>src/core/auth/AuthContext.tsx</code>
                </li>
                <li className="mb-2">
                  Remplacez ces pages d'exemple par vos propres composants
                </li>
                <li>
                  Supprimez ce composant <code>Home</code> et créez votre vraie
                  page d'accueil
                </li>
              </ol>
            </div>
          </div>

          {/* Features */}
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="h5 mb-0">✨ Fonctionnalités incluses</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2">🔐 Authentification JWT complète</li>
                    <li className="mb-2">🛡️ Routes protégées</li>
                    <li className="mb-2">
                      🌐 Client API avec gestion d'erreurs
                    </li>
                    <li className="mb-2">💾 Persistance localStorage</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2">🔄 Refresh tokens automatique</li>
                    <li className="mb-2">📝 Types TypeScript complets</li>
                    <li className="mb-2">🎨 Bootstrap 5 intégré</li>
                    <li className="mb-2">🔧 Configuration flexible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* API Usage */}
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="h5 mb-0">🔧 Utilisation de l'API</h3>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                Exemples d'utilisation des fonctions fetch :
              </p>
              <pre className="bg-light p-3 rounded">
                <code>{`// Import des fonctions API
import { getFetch, postFetch, withAuth } from './core/api/fetch';
import { useAuth } from './core/auth/AuthContext';

// Dans votre composant
const { token, login } = useAuth();

// Requête GET avec authentification
const response = await getFetch<User>('/user/profile', withAuth(token));

// Requête POST pour login
const loginResponse = await postFetch('/auth/login', {
  email: 'user@example.com',
  password: 'password'
});

if (loginResponse.success) {
  login(loginResponse.data.token, loginResponse.data.refreshToken, loginResponse.data.user);
}`}</code>
              </pre>
            </div>
          </div>

          {/* Structure */}
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="h5 mb-0">📁 Structure du projet</h3>
            </div>
            <div className="card-body">
              <pre className="bg-light p-3 rounded small">
                <code>{`src/
├── core/                    # 🎯 Fonctionnalités réutilisables
│   ├── api/                 # Client API et utilitaires fetch
│   ├── auth/                # Système d'authentification
│   ├── config/              # Configuration et types
├── components/              # Composants réutilisables
├── pages/                   # Pages de votre application
└── App.tsx                  # Composant principal`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
