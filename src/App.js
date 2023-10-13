import './App.css';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import Header from './components/Header';
import Products from './components/Products';
import Product from './components/Product';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
