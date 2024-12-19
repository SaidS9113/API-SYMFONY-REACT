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
import Footer from "./components/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectionRoute";
import { UserProvider } from "./components/UserContext";
import "./assets/css/style.css";

function App() {
  return (
    <>
     <UserProvider>
      <Router>
        <header>
          <Header />
        </header>
       
        <Routes>
          {/* Routes accessibles à tout le monde */}
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/form-auth" element={<FormAuth />} />
          <Route path="/profil-utilisateur" element={<Profil />} />

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
        
        <footer>
          <Footer />
        </footer>
      </Router>
      </UserProvider>
    </>
  );
}

export default App;
