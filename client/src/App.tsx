import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import LoginScreen from './components/screen/LoginScreen';
import RegisterScreen from './components/screen/RegisterScreen';
import SplashScreen from './components/screen/SplashScreen';
import MainFeedScreen from './components/screen/MainFeedScreen';
import WelcomeMenu from './components/menu/WelcomeMenu';
import UserMenu from './components/menu/UserMenu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NavBar items={<WelcomeMenu/>}/>}/>
        <Route path='/login/' element={<NavBar items={<WelcomeMenu/>}/>}/>
        <Route path='/register/' element={<NavBar items={<WelcomeMenu/>}/>}/>
        <Route path='/feed' element={<NavBar items={<UserMenu/>}/>}/>
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
