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
import NotificationSnack from "./components/modals/NotificationSnack";
import { SnackContextProvider } from "./context/snack";
import { SocialContextProvider } from "./context/social";
import { ModalContextProvider } from "./context/modal";
import CreateCommunityModal from "./components/modals/CreateCommunityModal";
import CreateContestModal from "./components/modals/CreateContestModal";
import DeleteCommunityModal from "./components/modals/DeleteCommunityModal";
import DeleteContestModal from "./components/modals/DeleteContestModal";
import { TilemapEditContextProvider } from "./context/tilemapEditor";
import UploadTilesetModal from "./components/modals/UploadTilesetModal";
import { ForumContextProvider } from "./context/social/forum";
import ForumPostViewerModal from "./components/modals/ForumPostViewerModal";
import { CommunityContextProvider } from "./context/social/community";
import { ContestContextProvider } from "./context/social/contest";
import { ProfileContextProvider } from "./context/profile";
import CreatePropertyModal from "./components/modals/CreatePropertyModal";
import { UserContextProvider } from "./context/social/user";
import AddCollaboratorModal from "./components/modals/AddCollaboratorModal";
import AddTilesetModal from "./components/modals/AddTilesetModal";

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

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthContextProvider key={"auth-context-provider"}>
          <SnackContextProvider key={"snack-context-provider"}>
            <ModalContextProvider key={"modal-context-provider"}>
              <SocialContextProvider key={"social-context-provider"}>
                <UserContextProvider key={"user-context-provider"}>
                  <CommunityContextProvider key={"community-context-provider"}>
                    <ContestContextProvider key={"contest-context-provider"}>
                      <ForumContextProvider key={"forum-context-provider"}>
                        <ProfileContextProvider
                          key={"profile-context-provider"}
                        >
                          <NavBar />
                          <Routes>
                            <Route path="/" element={<SplashScreen />} />
                            <Route path="/login" element={<LoginScreen />} />
                            <Route
                              path="/register"
                              element={<RegisterScreen />}
                            />
                            <Route path="/home" element={<HomeScreen />} />
                            <Route
                              path="/settings"
                              element={<AccountSettingsScreen />}
                            />
                            <Route
                              path="/community/:id"
                              element={<CommunityProfileScreen />}
                            />
                            <Route
                              path="/profile/:id"
                              element={<UserProfileScreen />}
                            />
                            <Route
                              path="/search/tilemaps"
                              element={
                                <SearchScreen cat={SearchCategory.Tilemaps} />
                              }
                            />
                            <Route
                              path="/search/tilesets"
                              element={
                                <SearchScreen cat={SearchCategory.Tilesets} />
                              }
                            />
                            <Route
                              path="/search/users"
                              element={
                                <SearchScreen cat={SearchCategory.Users} />
                              }
                            />
                            <Route
                              path="/search/communities"
                              element={
                                <SearchScreen
                                  cat={SearchCategory.Communities}
                                />
                              }
                            />
                            <Route
                              path="/search/contests"
                              element={
                                <SearchScreen cat={SearchCategory.Contests} />
                              }
                            />
                            <Route
                              path="/search/forums"
                              element={
                                <SearchScreen cat={SearchCategory.Forums} />
                              }
                            />
                            <Route
                              path="/create/tileset/:id"
                              element={
                                <TilesetEditContextProvider>
                                  <TilesetEditorScreen />
                                  <UploadTilesetModal />
                                </TilesetEditContextProvider>
                              }
                            />
                            <Route
                              path="/create/tilemap"
                              element={
                                <TilemapEditContextProvider>
                                  <TilemapEditorScreen />
                                  <CreatePropertyModal />
                                  <AddCollaboratorModal />
                                  <AddTilesetModal />
                                </TilemapEditContextProvider>
                              }
                            />
                          </Routes>
                          <NotificationSnack />
                          <UploadTilesetModal />
                          <CreateCommunityModal />
                          <CreateContestModal />
                          <DeleteCommunityModal />
                          <DeleteContestModal />
                        </ProfileContextProvider>
                      </ForumContextProvider>
                    </ContestContextProvider>
                  </CommunityContextProvider>
                </UserContextProvider>
              </SocialContextProvider>
            </ModalContextProvider>
          </SnackContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
