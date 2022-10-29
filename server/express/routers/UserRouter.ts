import { Router } from 'express';
import { UserController } from "../controllers";
import { Auth } from "../middleware";

const UserRouter: Router = Router();

UserRouter.get('/:id', Auth.verifyJWT, UserController.getUserById);
UserRouter.get('/verify/:id', UserController.verifyUser);

UserRouter.post('/', UserController.createUser);
UserRouter.post('/login', UserController.loginUser);
UserRouter.post('/logout', Auth.verifyJWT, UserController.logoutUser);

UserRouter.put('/', Auth.verifyJWT, UserController.updateUserById);
UserRouter.put('/username', Auth.verifyJWT, UserController.updateUserUsername);
UserRouter.put('/password', Auth.verifyJWT, UserController.updateUserPassword);
UserRouter.put('/email', Auth.verifyJWT, UserController.updateUserEmail);

UserRouter.delete('/', Auth.verifyJWT, UserController.deleteUserById);

export default UserRouter;