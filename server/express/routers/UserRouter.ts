import { Router } from 'express';
import { UserController } from "../controllers";

import { Auth, Upload } from "../middleware";

const UserRouter: Router = Router();

UserRouter.get('/:id', Auth.verifyJWT, UserController.getUserById);
UserRouter.get('/', Auth.verifyJWT, UserController.getLoggedIn);
UserRouter.get('/verify/:id', UserController.verifyUser);
UserRouter.post('/users', UserController.getUsers);

UserRouter.get('/tilesets/unpublished', Auth.verifyJWT, UserController.getUnpublishedTilesets);

UserRouter.post('/', UserController.createUser);
UserRouter.post('/login', UserController.loginUser);
UserRouter.post('/logout', Auth.verifyJWT, UserController.logoutUser);

UserRouter.put('/profile', Auth.verifyJWT, Upload.single("file"), UserController.updateUserProfile);
UserRouter.put('/username', Auth.verifyJWT, UserController.updateUserUsername);
UserRouter.put('/password', Auth.verifyJWT, UserController.updateUserPassword);
UserRouter.put('/email', Auth.verifyJWT, UserController.updateUserEmail);

UserRouter.put('/reset/password', UserController.resetPassword);

UserRouter.put('/friend/add/:id', Auth.verifyJWT, UserController.addFriend);
UserRouter.put('/friend/remove/:id', Auth.verifyJWT, UserController.removeFriend);

UserRouter.delete('/', Auth.verifyJWT, UserController.deleteUserById);

export default UserRouter;