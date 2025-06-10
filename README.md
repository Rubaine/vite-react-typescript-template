# 🚀 Vite React TypeScript Core Template

<div align="center">

**Template production-ready avec authentification JWT, routes protégées et client API complet.**

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646cff?logo=vite)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952b3?logo=bootstrap)](https://getbootstrap.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/username/vite-react-core-template?logo=github)](../../releases)

[🚀 Use Template](../../generate) • [📖 Documentation](#-utilisation) • [🐛 Issues](../../issues) • [💡 Discussions](../../discussions)

</div>

---

## ⚡ Quick Start

```bash
# 🎯 Option 1: Use GitHub Template (Recommandé)
# Cliquez sur "Use this template" ↗️ en haut de cette page

# 🎯 Option 2: Clone + Setup
git clone https://github.com/votre-username/vite-react-core-template.git mon-projet
cd mon-projet
rm -rf .git && git init  # Initialiser votre repo

# 📦 Installation et configuration
npm install
cp .env.example .env     # Configurer votre API_URL
npm run dev              # Démarrer le serveur ⚡
```

✨ **Votre app est prête !** → `http://localhost:5173` avec authentification JWT fonctionnelle.

> 💡 **Astuce** : Le template inclut une page d'accueil avec des explications détaillées et exemples d'usage

## 📋 Table des matières

- [✨ Fonctionnalités](#-fonctionnalités)
- [🏗️ Structure du projet](#-structure-du-projet)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#-configuration)
- [🔧 Utilisation](#-utilisation)
- [📚 API Reference](#-api-reference)
- [💡 Exemples pratiques](#-exemples-pratiques)
- [🛠️ Scripts & Build](#-scripts--build)
- [🤝 Contribution](#-contribution)
- [📝 Changelog](#-changelog)

## ✨ Fonctionnalités

<table>
<tr>
<td>

**🎯 Core Features**

- ⚛️ React 19 + TypeScript + Vite
- 🔐 Authentification JWT complète
- 🛡️ Routes protégées automatiques
- 🌐 Client API avec gestion d'erreurs
- 💾 Persistance localStorage
- 🎨 Bootstrap 5 intégré

</td>
<td>

**🚀 Developer Experience**

- 📁 Architecture modulaire claire
- 🔧 Configuration flexible
- 📝 Types TypeScript complets
- 🔄 Refresh tokens automatique
- 📖 Documentation complète
- 🧪 Exemples d'usage inclus

</td>
</tr>
</table>

## 🏗️ Structure du projet

```
📦 src/
├── 🎯 core/                    # Fonctionnalités réutilisables
│   ├── 🌐 api/                 # Client API et utilitaires fetch
│   │   └── fetch.tsx           # GET, POST, PUT, DELETE + withAuth()
│   ├── 🔐 auth/                # Système d'authentification
│   │   └── AuthContext.tsx     # Context React + hooks
│   └── ⚙️ config/              # Configuration globale
│       ├── global.tsx          # Config app (URLs, etc.)
│       ├── protectedRoute.tsx  # HOC route protégée
│       └── types.ts            # Types TypeScript
├── 🧩 components/              # Composants réutilisables
├── 📱 views/                   # Vues/Pages de l'application
│   └── Home/                   # Page d'accueil avec documentation
│       ├── Home.tsx            # Composant page d'accueil
│       └── Home.css            # Styles de la page
├── App.tsx                     # Composant principal + routing
└── main.tsx                    # Point d'entrée
```

> 💡 **Note** : Le dossier `views/` contient vos pages principales. Organisez vos composants selon vos préférences !

> 💡 **Le dossier `core/` est le cœur du template** - copiez-le dans vos nouveaux projets !

## 🚀 Installation

<details>
<summary><strong>📦 Méthode 1 : Template GitHub (Recommandée)</strong></summary>

1. Cliquez sur **"Use this template"** en haut de cette page
2. Créez votre nouveau repository
3. Clonez votre nouveau repo :

```bash
git clone https://github.com/votre-username/votre-projet.git
cd votre-projet
npm install
```

</details>

<details>
<summary><strong>📥 Méthode 2 : Clone direct</strong></summary>

```bash
git clone https://github.com/votre-username/vite-react-typescript-template.git mon-projet
cd mon-projet
rm -rf .git  # Supprimer l'historique git
git init     # Initialiser votre propre repo
npm install
```

</details>

<details>
<summary><strong>🎯 Méthode 3 : NPM Create Template</strong></summary>

```bash
# 📦 Créer un nouveau projet (une fois publié)
npm create vite@latest mon-projet -- --template votre-username/vite-react-core-template
cd mon-projet
npm install
```

> ⏳ **Bientôt disponible** - Template en cours de publication sur npm registry

</details>

<details>
<summary><strong>🔧 Setup complet après installation</strong></summary>

```bash
# 1. Configuration environnement
cp .env.example .env
nano .env  # Éditer VITE_API_URL

# 2. Personnalisation package.json
nano package.json  # Changer name, description, author

# 3. Initialiser Git (si clone direct)
rm -rf .git
git init
git add .
git commit -m "🎉 Initial commit from vite-react-core-template"

# 4. Premier build de test
npm run build
npm run preview
```

</details>

## ⚙️ Configuration

### 1. Variables d'environnement

Créer un fichier `.env` à la racine :

```env
# URL de votre API backend
VITE_API_URL=http://localhost:5000

# Optionnel : autres variables
VITE_APP_NAME=MonApp
```

### 2. Configuration de l'authentification

Personnaliser la configuration dans `App.tsx` :

```tsx
<AuthProvider
  config={{
    endpoints: {
      verify: "/api/auth/me", // Endpoint de vérification
      refresh: "/api/auth/refresh", // Endpoint de refresh token
    },
    storage: {
      tokenKey: "access_token", // Clé localStorage pour le token
      userKey: "current_user", // Clé localStorage pour l'utilisateur
    },
    autoVerify: false, // Désactiver la vérification auto
  }}
>
  <App />
</AuthProvider>
```

### 3. Configuration de l'API

Modifier `src/core/config/global.tsx` :

```tsx
export const Config = {
  Urls: {
    API: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  },
  App: {
    Name: "Mon Application",
    Version: "1.0.0",
  },
};
```

## 🔧 Utilisation

### Authentification

```tsx
import { useAuth } from "./core/auth/AuthContext";

function LoginForm() {
  const { login, logout, isAuthenticated, user, loading } = useAuth();

  // Vérifier l'état de chargement
  if (loading) return <div>Chargement...</div>;

  // Connecter un utilisateur
  const handleLogin = async (credentials) => {
    const response = await postFetch("/auth/login", credentials);
    if (response.success) {
      login(
        response.data.token,
        response.data.refreshToken,
        response.data.user
      );
    }
  };

  // Interface conditionnelle
  return isAuthenticated ? (
    <div>
      <h1>Bonjour {user?.name}!</h1>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  ) : (
    <LoginForm onSubmit={handleLogin} />
  );
}
```

### Organisation des vues

Le template utilise une organisation claire des vues dans le dossier `src/views/` :

```tsx
// src/views/Home/Home.tsx - Page d'accueil avec documentation
export default function Home() {
  return (
    <div className="container mt-4">
      {/* Documentation intégrée du template */}
      <h1>🚀 Template React + TypeScript + Vite</h1>
      {/* Explications et exemples d'usage */}
    </div>
  );
}

// Créez vos nouvelles vues de la même manière :
// src/views/Dashboard/Dashboard.tsx
// src/views/Profile/Profile.tsx
// etc.
```

> 💡 **Conseil** : La page `Home` actuelle contient toute la documentation du template. Remplacez-la par votre vraie page d'accueil une fois familiarisé avec le template.

### Requêtes API

```tsx
import { getFetch, postFetch, withAuth } from "./core/api/fetch";
import { useAuth } from "./core/auth/AuthContext";

function UserProfile() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);

  // GET avec authentification
  const fetchProfile = async () => {
    const response = await getFetch<User>("/profile", withAuth(token));
    if (response.success) {
      setUser(response.data);
    } else {
      console.error(response.error);
    }
  };

  // POST avec données
  const updateProfile = async (data) => {
    const response = await postFetch<User>("/profile", data, withAuth(token));
    if (response.success) {
      setUser(response.data);
    }
  };

  // Upload de fichier
  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await postFetch<User>(
      "/profile/avatar",
      formData,
      withAuth(token)
    );
    // La détection FormData est automatique
  };
}
```

### Routes protégées

```tsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./core/config/protectedRoute";
import Home from "./views/Home/Home";

function App() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Routes protégées */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
```

> 💡 **Structure recommandée** : Placez vos nouvelles pages dans `src/views/` et vos composants réutilisables dans `src/components/`

## 📚 API Reference

### Fonctions Fetch

#### `getFetch<T>(route, headers?)`

```tsx
const response = await getFetch<User[]>("/users");
// response: ApiResponse<User[]>
```

#### `postFetch<T>(route, data, headers?)`

```tsx
const response = await postFetch<User>("/users", { name: "John" });
// Support automatique FormData et JSON
```

#### `putFetch<T>(route, data, headers?)`

```tsx
const response = await putFetch<User>("/users/123", updateData);
```

#### `deleteFetch<T>(route, headers?)`

```tsx
const response = await deleteFetch("/users/123");
```

#### `withAuth(token, headers?)`

```tsx
const headers = withAuth(userToken, { "Custom-Header": "value" });
// Retourne: { Authorization: 'Bearer token', 'Custom-Header': 'value' }
```

### Hook useAuth

```tsx
const {
  isAuthenticated, // boolean - État d'authentification
  token, // string | null - Token d'accès
  refreshToken, // string | null - Token de refresh
  user, // User | null - Données utilisateur
  login, // (token, refreshToken?, user?) => void
  logout, // () => void
  verifyToken, // (token?) => Promise<boolean>
  refreshAccessToken, // () => Promise<boolean>
  updateUser, // (user) => void
  loading, // boolean - État de chargement
  config, // AuthConfig - Configuration actuelle
} = useAuth();
```

### Types principaux

```tsx
interface ApiResponse<T> {
  status: number;
  data: T | null;
  error?: string;
  success: boolean;
}

interface User {
  id: string;
  email: string;
  name?: string;
  [key: string]: any;
}

interface AuthConfig {
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
```

## 💡 Exemples pratiques

### Gestion d'erreurs robuste

```tsx
const handleApiCall = async () => {
  const response = await getFetch<Data>("/data");

  if (response.success) {
    // Succès - response.data est typé
    setData(response.data);
  } else {
    // Erreur - afficher le message
    setError(response.error);

    // Gestion spécifique par code de statut
    switch (response.status) {
      case 401:
        // Token expiré - redirection login
        logout();
        break;
      case 403:
        // Pas d'autorisation
        setError("Accès refusé");
        break;
      default:
        setError("Erreur serveur");
    }
  }
};
```

### Refresh automatique des tokens

```tsx
// Le refresh est automatique, mais peut être manuel
const { refreshAccessToken } = useAuth();

const handleExpiredToken = async () => {
  const success = await refreshAccessToken();
  if (success) {
    // Token renouvelé, refaire la requête
    await retryApiCall();
  } else {
    // Échec du refresh, déconnexion
    logout();
  }
};
```

### Configuration pour différents backends

```tsx
// Pour une API REST classique
<AuthProvider config={{
  endpoints: {
    verify: "/api/auth/me",
    refresh: "/api/auth/refresh"
  }
}} />

// Pour Firebase ou services tiers
<AuthProvider config={{
  endpoints: {
    verify: "/api/user/profile"
  },
  autoVerify: false // Gérer manuellement
}} />

// Pour des clés de stockage personnalisées
<AuthProvider config={{
  storage: {
    tokenKey: "jwt_token",
    userKey: "user_data"
  }
}} />
```

## 🛠️ Scripts & Build

| Script             | Description            | Usage               |
| ------------------ | ---------------------- | ------------------- |
| `npm run dev`      | 🚀 Dev server avec HMR | Développement local |
| `npm run build`    | 📦 Build optimisé      | Production build    |
| `npm run preview`  | 👀 Preview du build    | Test avant deploy   |
| `npm run lint`     | 🔍 ESLint check        | Code quality        |
| `npm run lint:fix` | 🔧 Fix ESLint auto     | Correction auto     |

<details>
<summary><strong>📦 Guide de déploiement</strong></summary>

### Netlify

```bash
npm run build
# Drag & drop du dossier `dist/` sur Netlify
```

### Vercel

```bash
npm i -g vercel
vercel --prod
```

### GitHub Pages

```bash
npm run build
# Configurer GitHub Actions avec le workflow .github/workflows/deploy.yml
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
```

</details>

## 🤝 Contribution

Les contributions sont les bienvenues ! 🎉

<details>
<summary><strong>🛠️ Comment contribuer</strong></summary>

1. **Fork** le projet
2. Créer une branche feature
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Développer** et tester
   ```bash
   npm run dev    # Test local
   npm run build  # Vérifier le build
   npm run lint   # Code quality
   ```
4. **Commit** avec un message descriptif
   ```bash
   git commit -m "✨ Add amazing feature"
   ```
5. **Push** et créer une **Pull Request**
   ```bash
   git push origin feature/amazing-feature
   ```

</details>

### 🐛 Signaler un problème

- **Bug** : [Créer une issue](../../issues/new?template=bug_report.md)
- **Feature Request** : [Proposer une amélioration](../../issues/new?template=feature_request.md)
- **Question** : [Démarrer une discussion](../../discussions)

### 📋 Roadmap

- [ ] 🔌 Support WebSocket integration
- [ ] 🎨 Themes system (dark/light)
- [ ] 📱 PWA configuration
- [ ] 🧪 Unit tests setup
- [ ] 📊 Analytics integration
- [ ] 🌍 i18n localization

## 📝 Changelog

### v1.0.0 (Latest)

- ✨ Initial release
- 🔐 JWT Authentication system
- 🌐 Complete API client with TypeScript
- 🛡️ Protected routes HOC
- 📖 Comprehensive documentation
- 🎨 Bootstrap 5 integration

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">

## 🌟 Star ce projet si il vous aide !

**✨ Template créé avec ❤️ pour accélérer le développement React/TypeScript**

[![GitHub stars](https://img.shields.io/github/stars/username/vite-react-core-template?style=social)](../../stargazers)
[![GitHub forks](https://img.shields.io/github/forks/username/vite-react-core-template?style=social)](../../forks)

[📖 Documentation](https://github.com/username/vite-react-core-template/wiki) • [💬 Discord Community](#) • [🐦 Twitter Updates](#)

_Built with Vite ⚡ • Powered by React ⚛️ • Made with TypeScript 💙_

</div>
