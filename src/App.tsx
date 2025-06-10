import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./core/auth/AuthContext";
import ProtectedRoute from "./core/config/protectedRoute";
import Home from "./views/Home/Home";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          {/* Routes protégées */}
          <Route element={<ProtectedRoute />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
