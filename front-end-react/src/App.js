import Header from "./components/Header";
import ListeProduit from "./components/ListeProduit";
import AjoutProduit from "./components/AjoutProduit";
import './assets/css/style.css';

function App() {
  return (
    <>
  
    <header>
       <Header/>
       </header>
       <main >
       <ListeProduit/>
       </main>
      <div>
      <AjoutProduit/>
      </div>
       <footer>
      
       </footer>
       
       
  
       </>
  );
};

export default App;