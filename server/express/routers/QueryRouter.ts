import { Router } from "express";
import { QueryController } from "../controllers";
import { Auth } from "../middleware";

const router: Router = Router();

router.get('/socials/tilemaps', QueryController.getTilemapSocials);
router.get('/socials/tilesets', QueryController.getTilesetSocials);
router.get('/tilemaps', Auth.verifyJWT, QueryController.getUserTilemaps);
router.get('/tilesets', Auth.verifyJWT, QueryController.getUserTilesets);
router.get('/communities', Auth.verifyJWT, QueryController.getUserCommunities);
router.get('/contests', Auth.verifyJWT, QueryController.getUserContests);

export default router;