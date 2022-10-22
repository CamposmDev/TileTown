import { Router } from 'express';
import { UserController } from "../controllers";

const UserRouter: Router = Router();

UserRouter.get('/:id', UserController.getUserById);

UserRouter.post('/', UserController.createUser);
UserRouter.post('/login', UserController.loginUser);
UserRouter.post('/logout', UserController.logoutUser);

UserRouter.put('/:id', UserController.updateUserById);

UserRouter.delete('/:id', UserController.deleteUserById);

export default UserRouter;