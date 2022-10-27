import { Router } from 'express';

import ContestRouter from './ContestRouter';
import ForumRouter from './ForumRouter';
import UserRouter from './UserRouter';
import CommunityRouter from './CommunityRouter';
import TilemapRouter from './TilemapRouter';
import TilesetRouter from './TilesetRouter';


/** The main Router object for the TileTown API */
const router: Router = Router();

router.use('/user', UserRouter);
router.use('/contest', ContestRouter);
router.use('/forum', ForumRouter);
router.use('/community', CommunityRouter);
router.use('/tileset', TilesetRouter);
router.use('/tilemap', TilemapRouter);

export default router;