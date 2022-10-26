import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import { SplashScreen, LoginScreen, RegisterScreen, MainFeedScreen, AccountSettingsScreen } from './components/screen';
import WelcomeMenu from './components/menu/WelcomeMenu';
import UserMenu from './components/menu/UserMenu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {['/', '/login', '/register'].map((x,i) => 
          <Route path={x} element={<NavBar items={<WelcomeMenu/>}/>} key={i}/>
          )}
        {['/feed', '/settings'].map((x,i) =>
          <Route path={x} element={<NavBar items={<UserMenu/>}/>}/>
        )}
      </Routes>
      <Routes>
        <Route path='/' element={<SplashScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />
        <Route path='/feed' element={<MainFeedScreen />} />
        <Route path='/settings' element={<AccountSettingsScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
