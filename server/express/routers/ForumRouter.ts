import { Router } from 'express';
import { ForumController } from '../controllers'
import { Auth } from "../middleware";

const ForumRouter: Router = Router();

ForumRouter.get('/:id', ForumController.getForumPostById);
ForumRouter.get('/', ForumController.getForumPosts);

ForumRouter.post('/', Auth.verifyJWT, ForumController.createForumPost);
ForumRouter.put('/:id', Auth.verifyJWT, ForumController.updateForumPostById);
ForumRouter.delete('/:id', Auth.verifyJWT, ForumController.deleteForumPostById);

ForumRouter.put('/view/:id', Auth.verifyJWT, ForumController.viewForumPost);
ForumRouter.put('/like/:id', Auth.verifyJWT, ForumController.likeForumPostById);
ForumRouter.put('/dislike/:id', Auth.verifyJWT, ForumController.dislikeForumPostById);
ForumRouter.post('/comment/:id', Auth.verifyJWT, ForumController.commentForumPostById);


export default ForumRouter;