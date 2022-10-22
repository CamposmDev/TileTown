import { Router } from 'express';
import { UserController } from "../controllers";
import { Auth } from "../middleware";

const UserRouter: Router = Router();

UserRouter.get('/:id', Auth.verifyJWT, UserController.getUserById);

UserRouter.post('/', UserController.createUser);
UserRouter.post('/login', UserController.loginUser);
UserRouter.post('/logout', Auth.verifyJWT, UserController.logoutUser);

UserRouter.put('/:id', Auth.verifyJWT, UserController.updateUserById);

UserRouter.delete('/:id', Auth.verifyJWT, UserController.deleteUserById);

export default UserRouter;