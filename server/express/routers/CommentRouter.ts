import { Router } from 'express';
import { CommentController } from '../controllers';

const CommentRouter: Router = Router();

CommentRouter.get('/:id', CommentController.getCommentById);

export default CommentRouter;