import './assets/css/app.css';
import './assets/css/auth.css';
import './assets/css/bs.uncss.css';
import './assets/css/index.css';
import './assets/css/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages';
import AuthLogin from './pages/auth-login';
import AuthRegister from './pages/auth-register';
import Drink from './pages/drink';
import Drinks from './pages/drinks';
import Cart from './pages/cart';
import Orders from './pages/orders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/login' element={<AuthLogin />} />
        <Route path='/register' element={<AuthRegister />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/drink' element={<Drink />} />
        <Route path='/drinks' element={<Drinks />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='*' element={<>
          Page Does Not Exist
        </>} />
      </Routes>
    </Router>
  )
}

export default App
