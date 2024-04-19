import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Signup />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
