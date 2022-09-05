import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup';
import Home from './pages/Home';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
