import Header from "./components/Header";
import Accueil from "./components/Accueil";
import Boutique from "./components/Boutique";
import ListeProduit from "./components/ListeProduit";
import ListeCategorie from "./components/ListeCategorie";
import AjoutProduit from "./components/AjoutProduit";
import ModificationProduit from "./components/ModificationProduit";
import FormAuth from "./components/FormAuth";
import Inscription from "./components/Inscription";
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
       <Route path="/liste-produit" element={<ListeProduit />} />
       <Route path="/liste-categorie" element={<ListeCategorie />} />
       <Route path="/ajout-produit" element={<AjoutProduit />} />
       <Route path="/ModificationProduit/:id" element={<ModificationProduit />} />
       <Route path="/form-auth" element={<FormAuth />} />
       <Route path="/inscription" element={<Inscription />} />
       </Routes>
       </Router>
      
       <footer>
      
       </footer>
       
       
  
       </>
  );
};

export default App;