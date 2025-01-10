import Header from "./components/Header";
import Accueil from "./components/Accueil";
import Boutique from "./components/Boutique";
import ListeProduit from "./components/ListeProduit";
import ListeCategorie from "./components/ListeCategorie";
import AjoutProduit from "./components/AjoutProduit";
import ModificationProduit from "./components/ModificationProduit";
import ModificationCategorie from "./components/ModificationCategorie";
import FormAuth from "./components/FormAuth";
import Inscription from "./components/Inscription";
import Panier from "./components/Panier";
import Profil from "./components/Profil";
import PageProduit from "./components/PageProduit";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectionRoute";
import { UserProvider } from "./components/UserContext";
import { PanierProvider } from "./PanierContext";
import "./assets/css/style.css";

function App() {
  return (
    <UserProvider>
      <PanierProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <header>
              <Header />
            </header>
            
            <main className="flex-grow">
              <Routes>
                {/* Redirection de l'index vers l'accueil */}
                <Route path="/" element={<Navigate to="/accueil" replace />} />

                {/* Routes accessibles à tout le monde */}
                <Route path="/accueil" element={<Accueil />} />
                <Route path="/boutique" element={<Boutique />} />
                <Route path="/panier" element={<Panier />} />
                <Route path="/inscription" element={<Inscription />} />
                <Route path="/form-auth" element={<FormAuth />} />
                <Route path="/profil-utilisateur" element={<Profil />} />
                <Route path="/page-produit/:id" element={<PageProduit />} />

                {/* Routes réservées aux administrateurs */}
                <Route
                  path="/liste-vehicule"
                  element={
                    <ProtectedRoute roles={["ROLE_ADMIN"]}>
                      <ListeProduit />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/liste-categorie"
                  element={
                    <ProtectedRoute roles={["ROLE_ADMIN"]}>
                      <ListeCategorie />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ajout-vehicule-categorie"
                  element={
                    <ProtectedRoute roles={["ROLE_ADMIN"]}>
                      <AjoutProduit />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ModificationProduit/:id"
                  element={
                    <ProtectedRoute roles={["ROLE_ADMIN"]}>
                      <ModificationProduit />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ModificationCategorie/:id"
                  element={
                    <ProtectedRoute roles={["ROLE_ADMIN"]}>
                      <ModificationCategorie />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

            <footer>
              <Footer />
            </footer>
          </div>
        </Router>
      </PanierProvider>
    </UserProvider>
  );
}

export default App;