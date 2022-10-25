import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import SplashScreen from './components/SplashScreen';
import MainFeedScreen from './components/MainFeedScreen';
import WelcomeMenu from './components/menu/WelcomeMenu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NavBar items={<WelcomeMenu/>}/>}/>
        <Route path='/login/' element={<NavBar items={<WelcomeMenu/>}/>}/>
        <Route path='/register/' element={<NavBar items={<WelcomeMenu/>}/>}/>
      </Routes>
      <Routes>
        <Route path='/' element={<SplashScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />
        <Route path='/feed' element={<MainFeedScreen />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
