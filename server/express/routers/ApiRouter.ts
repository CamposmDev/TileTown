import express, { Router } from 'express';
import path from "path";

import ContestRouter from './ContestRouter';
import ForumRouter from './ForumRouter';
import UserRouter from './UserRouter';
import CommunityRouter from './CommunityRouter';
import TilemapRouter from './TilemapRouter';
import TilesetRouter from './TilesetRouter';
import QueryRouter from './QueryRouter';
import CommentRouter from './CommentRouter';


/** The main Router object for the TileTown API */
const router: Router = Router();

router.use('/user', UserRouter);
router.use('/contest', ContestRouter);
router.use('/forum', ForumRouter);
router.use('/community', CommunityRouter);
router.use('/tileset', TilesetRouter);
router.use('/tilemap', TilemapRouter);
router.use('/query', QueryRouter);
router.use('/comment', CommentRouter);

router.use('/media', express.static(path.join(__dirname, "../middleware/images")));

export default router;