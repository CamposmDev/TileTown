import { Router } from 'express';
import { ForumController } from '../controllers'
import { Auth } from "../middleware";

const ForumRouter: Router = Router();

ForumRouter.post('/', Auth.verifyJWT, ForumController.createForumPost);
ForumRouter.get('/:id', ForumController.getForumPostById);
ForumRouter.put('/:id', Auth.verifyJWT, ForumController.updateForumPostById);
ForumRouter.put('/like/:id', Auth.verifyJWT, ForumController.likeForumPostById);
ForumRouter.post('/comment/:id', Auth.verifyJWT, ForumController.commentForumPostById);

export default ForumRouter;