import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AppBanner from './components/AppBanner';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import SplashScreen from './components/SplashScreen';
import MainFeedScreen from './components/MainFeedScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppBanner />}/>
        <Route path='/login/' element={<AppBanner/>}/>
        <Route path='/register/' element={<AppBanner/>}/>
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
