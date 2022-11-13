import './App.css';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.css';
import Admin from './pages/Admin';
import axios from 'axios';

const getAllProducts = 'https://ashopauth.herokuapp.com/api/product/';

const getFirstFiveProducts = async () => {
  try {
    const { data } = await axios.get(getAllProducts);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

function App() {
  const user = { name: 'Gal', type: 1 };

  useEffect(() => {
    getFirstFiveProducts();
  }, []);

  return (
    <Router>
      <div style={{
        display: 'flex', flex: 1, flexDirection: 'column', height: '100vh', border: '2px solid green',
      }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Admin />} />
          <Route path="/auth" element={<Admin />} />
          <Route path="/browse" element={<Admin />} />
          <Route path="/product" element={<Admin />} />
          {
            user.type === 1 ? <Route path="/admin" element={<Admin />} /> : undefined

          }
        </Routes>
        <Header />

      </div>
    </Router>
  );
}

export default App;
