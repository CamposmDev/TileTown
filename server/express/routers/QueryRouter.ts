import { Router } from "express";
import { QueryController } from "../controllers";
import { Auth } from "../middleware";

const router: Router = Router();

router.get('/socials/tilemaps', QueryController.getTilemapSocials);
router.get('/socials/tilesets', QueryController.getTilesetSocials);
router.get('/tilemaps', Auth.verifyJWT, QueryController.getUserTilemaps);
router.get('/tilesets', Auth.verifyJWT, QueryController.getUserTilesets);


router.get('/communities', QueryController.getCommunities);
router.get('/contests', QueryController.getContests);
router.get('/users', QueryController.getUsers)

export default router;