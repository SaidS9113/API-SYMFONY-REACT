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
import ProduitBugattiChiron from "./components/ProduitBugattiChiron";
import ProduitPorche911 from "./components/ProduitPorche911";
import ProduitBMW_M5 from "./components/ProduitBMW_M5";
import ProduitToyota_RAV4 from "./components/ProduitToyota_RAV4";
import CheckoutForm from "./components/CheckoutForm";
import SectionProduit from "./components/SectionProduit";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectionRoute";
import { UserProvider } from "./components/UserContext";
import { PanierProvider } from "./PanierContext";
import { Elements } from "@stripe/react-stripe-js"; 
import { loadStripe } from "@stripe/stripe-js"; 
import "./assets/css/style.css";

const stripePromise = loadStripe("pk_test_51QfKrtGYlym3LEYwksBSpsJGVIPXpJEN50Lz8RWCjVuAn0PwoUMEdjiD40TpTPPJ7CrzWKuhP1PmOoy77asvQ7Dv00PddWWT60");

function App() {
  return (
    <UserProvider>
      <PanierProvider>
      <Elements stripe={stripePromise}> {/* Fournisseur Stripe */}
        <Router>
          <div className="flex flex-col min-h-screen">
            <header id="header">
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
                <Route path="/produit-bugatti-chiron" element={<ProduitBugattiChiron />} />
                <Route path="/produit-porche-911" element={<ProduitPorche911 />} />
                <Route path="/produit-produit-BMW_5" element={<ProduitBMW_M5 />} />
                <Route path="/produit-toyota-RAV4" element={<ProduitToyota_RAV4 />} />
                <Route path="/formulaire-paiement-stripe" element={<CheckoutForm />} />
                <Route path="/" element={<SectionProduit />} />
                <Route path="/contact" element={<Contact />} />

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
        </Elements>
      </PanierProvider>
    </UserProvider>
  );
}

export default App;