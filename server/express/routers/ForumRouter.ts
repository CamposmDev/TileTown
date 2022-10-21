import { Router } from 'express';
import { ForumController } from '../controllers'

const ForumRouter: Router = Router();

ForumRouter.get('/:id', ForumController.getForumPostById);
ForumRouter.post('/', ForumController.createForumPost);
ForumRouter.post('/comment/:id', ForumController.commentForumPostById);
ForumRouter.put('/:id', ForumController.updateForumPostById);
ForumRouter.put('/like/:id', ForumController.likeForumPostById);

export default ForumRouter;