import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AppHeader from './components/AppHeader';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import SplashScreen from './components/SplashScreen';

function App() {
  return (
    <BrowserRouter>
      <AppHeader/>
      <Routes>
        <Route path='/' element={<SplashScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
