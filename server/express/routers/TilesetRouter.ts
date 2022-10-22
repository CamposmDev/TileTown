import { Router } from 'express';
import { TilesetController } from '../controllers';

const router: Router = Router();

router.get('/:id', TilesetController.getTilesetById);
router.get('/pairs/:search/:sort', TilesetController.getTilesetPairs);
router.get('/social/:id', TilesetController.getTilesetSocialStats);

router.post('/', TilesetController.createTileset);
router.post('/comment/:id', TilesetController.commentTilesetById);

router.put('/:id', TilesetController.updateTilesetById);
router.put('/like/:id', TilesetController.likeTilesetById);
router.put('/dislike/:id', TilesetController.dislikeTilesetById);
router.put('/view/:id', TilesetController.viewTilesetById);

router.delete('/:id', TilesetController.deleteTilesetById);

export default router;