import Header from "./components/Header";
import Accueil from "./components/Accueil";
import Boutique from "./components/Boutique";
import ListeProduit from "./components/ListeProduit";
import AjoutProduit from "./components/AjoutProduit";
import ModificationProduit from "./components/ModificationProduit";
import Contact from "./components/Contact";
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
       <Route path="/ajout-produit" element={<AjoutProduit />} />
       <Route path="/ModificationProduit/:id" element={<ModificationProduit />} />
       <Route path="/contact" element={<Contact />} />
       </Routes>
       </Router>
      
       <footer>
      
       </footer>
       
       
  
       </>
  );
};

export default App;