import { Router } from 'express';
import { ForumController } from '../controllers'
import { Auth } from "../middleware";

const ForumRouter: Router = Router();

ForumRouter.get('/:id', ForumController.getForumPostById);
ForumRouter.post('/', Auth.verifyJWT, ForumController.createForumPost);
ForumRouter.post('/comment/:id', Auth.verifyJWT, ForumController.commentForumPostById);
ForumRouter.put('/:id', Auth.verifyJWT, ForumController.updateForumPostById);
ForumRouter.put('/like/:id', Auth.verifyJWT, ForumController.likeForumPostById);

export default ForumRouter;