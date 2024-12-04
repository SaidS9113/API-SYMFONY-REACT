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
import Footer from "./components/Footer";


import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './assets/css/style.css';


function App() {
  return (
    <>
  <Router>
    <header>
       <Header/>
       </header>
       <Routes>
       <Route path="/accueil" element={<Accueil />} />
       <Route path="/boutique" element={<Boutique />} />
       <Route path="/liste-vehicule" element={<ListeProduit />} />
       <Route path="/liste-categorie" element={<ListeCategorie />} />
       <Route path="/ajout-vehicule-categorie" element={<AjoutProduit />} />
       <Route path="/ModificationProduit/:id" element={<ModificationProduit />} />
       <Route path="/ModificationCategorie/:id" element={<ModificationCategorie />} />
       <Route path="/form-auth" element={<FormAuth />} />
       <Route path="/inscription" element={<Inscription />} />
       <Route path="/panier" element={<Panier />} />
       </Routes>
      
       
       <footer>
      <Footer/>
       </footer>
       </Router>
       
  
       </>
  );
};

export default App;