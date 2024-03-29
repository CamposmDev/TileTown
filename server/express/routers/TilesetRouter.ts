import { Router } from "express";
import { TilesetController } from "../controllers";
import { Auth, Upload, TilesetMW } from "../middleware";

const router: Router = Router();

// Tileset - basic CRUD routes and publish
router.get("/:id", Auth.verifyJWT, TilesetController.getTilesetById);
router.post("/", Auth.verifyJWT, Upload.single('image'), TilesetMW.createTileset(), TilesetController.createTileset);
router.post("/publish/:id", Auth.verifyJWT, TilesetController.publishTileset);
router.put("/:id", Auth.verifyJWT, Upload.single('image'), TilesetController.updateTilesetById);
router.delete("/:id", Auth.verifyJWT, TilesetController.deleteTilesetById);

// router.get("/search/:query/:sort", Auth.verifyJWT, TilesetController.getPublishedTilesetsByName);

// SocialStatistics routes
router.get("/search/:query", TilesetController.getTilesetSocialsByName)
router.get("/social/:id", TilesetController.getTilesetSocialById);
router.get("/pairs/:search/:sort", Auth.verifyJWT, TilesetController.getTilesetPartials);
router.post("/comment/:id", Auth.verifyJWT, TilesetController.commentTilesetById);
router.put("/like/:id", Auth.verifyJWT, TilesetController.likeTilesetById);
router.put("/dislike/:id", Auth.verifyJWT, TilesetController.dislikeTilesetById);
router.put("/view/:id", TilesetController.viewTilesetById);

router.put('/favorite/:id', Auth.verifyJWT, TilesetController.favoriteTilesetById);
router.put('/unfavorite/:id', Auth.verifyJWT, TilesetController.unfavoriteTilesetById);

router.get('/social/tsid/:id', TilesetController.getTilesetSocialByTilesetId)
router.get(`/popular/top10`, TilesetController.getPopularTop10)

router.get(`/social/community/:id`, TilesetController.getPopularCommunityTilesets)

export default router;
