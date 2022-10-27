import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import { SplashScreen, LoginScreen, RegisterScreen, MainFeedScreen, AccountSettingsScreen, TilesetEditorScreen, TilemapEditorScreen } from './components/screen';
import WelcomeMenu from './components/menu/WelcomeMenu';
import UserMenu from './components/menu/UserMenu';
import CardTester from './components/CardTester';

/**
 * Pixel Editors 
 * @see https://github.com/alekspopovic/pixel-art-drawing-editor
 * @see https://github.com/satansdeer/drawing-react-canvas/tree/master/src 
 * @see https://github.com/CodingGarden/react-pixel-art-maker
 * @see https://github.com/0shuvo0/pilex-art.git
 * 
 * Color Picker
 * @see https://www.npmjs.com/package/material-ui-color-picker
 */

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {['/', '/login', '/register'].map((x,i) => 
          <Route path={x} element={<NavBar items={<WelcomeMenu/>}/>} key={i}/>
          )}
        {['/feed', '/settings', '/create/tileset', '/create/tilemap'].map((x,i) =>
          <Route path={x} element={<NavBar items={<UserMenu/>} key={i}/>}/>
        )}
      </Routes>
      <Routes>
        <Route path='/cards' element={<CardTester/>}/>
        <Route path='/' element={<SplashScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />
        <Route path='/feed' element={<MainFeedScreen />} />
        <Route path='/settings' element={<AccountSettingsScreen/>}/>
        <Route path='/create/tileset' element={<TilesetEditorScreen/>}/>
        <Route path='/create/tilemap' element={<TilemapEditorScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
