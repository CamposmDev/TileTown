import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import {
  SplashScreen,
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  SearchScreen,
  AccountSettingsScreen,
  TilesetEditorScreen,
  TilemapEditorScreen,
  UserProfileScreen,
  CommunityProfileScreen,
} from "./components/screen";
import { SearchCategory } from "./components/util/Constants";
import { AuthContextProvider } from "./context/auth";
import { TilesetEditContextProvider } from "./context/tilesetEditor";
import CardTester from "./components/CardTester";
import ModalTester from "./components/ModalTester";
import NotificationSnack from "./components/modals/NotificationSnack";
import { SnackContextProvider } from "./context/snack";

/**
 * Pixel Editors
 * @see https://github.com/alekspopovic/pixel-art-drawing-editor
 * @see https://github.com/satansdeer/drawing-react-canvas/tree/master/src
 * @see https://github.com/CodingGarden/react-pixel-art-maker
 * @see https://github.com/0shuvo0/pilex-art.git
 *
 * Color Picker
 * @see https://www.npmjs.com/package/material-ui-color-picker
 *
 * Cool Carosel for Popular Items
 * @see https://www.npmjs.com/package/react-material-ui-carousel
 *
 * Upload Button
 * @see https://mui.com/material-ui/react-button/#upload-button
 *
 */

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SnackContextProvider key={'snack-context-provider'}>
          <AuthContextProvider key={"auth-context-provider"}>
            <NavBar />
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/settings" element={<AccountSettingsScreen />} />
              <Route
                path="/community/rpgs-done-right"
                element={<CommunityProfileScreen />}
              />
              <Route path="/profile" element={<UserProfileScreen />} />
              <Route
                path="/search/tilemaps"
                element={<SearchScreen cat={SearchCategory.Tilemaps} />}
              />
              <Route
                path="/search/tilesets"
                element={<SearchScreen cat={SearchCategory.Tilesets} />}
              />
              <Route
                path="/search/users"
                element={<SearchScreen cat={SearchCategory.Users} />}
              />
              <Route
                path="/search/communities"
                element={<SearchScreen cat={SearchCategory.Communities} />}
              />
              <Route
                path="/search/contests"
                element={<SearchScreen cat={SearchCategory.Contests} />}
              />
              <Route
                path="/search/forums"
                element={<SearchScreen cat={SearchCategory.Forums} />}
              />
              <Route
                path="/create/tileset"
                element={
                  <TilesetEditContextProvider>
                    <TilesetEditorScreen />
                  </TilesetEditContextProvider>
                }
              />
              <Route path="/create/tilemap" element={<TilemapEditorScreen />} />
              <Route path="/cards" element={<CardTester />} />
              <Route path="/modals" element={<ModalTester />} />
            </Routes>
            <NotificationSnack />
          </AuthContextProvider>
        </SnackContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
