import { Router } from "express";
import { TilesetController } from "../controllers";
import { Auth, Upload } from "../middleware";

const router: Router = Router();

// Tilemap - basic CRUD routes and publish
router.get("/:id", Auth.verifyJWT, TilesetController.getTilesetById);
router.post("/", Auth.verifyJWT, TilesetController.createTileset);
router.post("/publish/:id", Auth.verifyJWT, TilesetController.publishTileset);

router.put("/:id", Auth.verifyJWT, Upload.single('tileset'), TilesetController.updateTilesetById);

router.delete("/:id", Auth.verifyJWT, TilesetController.deleteTilesetById);

// SocialStatistics routes
router.get("/social/:id", TilesetController.getTilesetSocialById);
router.get("/pairs/:search/:sort", Auth.verifyJWT, TilesetController.getTilesetPartials);
router.post("/comment/:id", Auth.verifyJWT, TilesetController.commentTilesetById);
router.put("/like/:id", Auth.verifyJWT, TilesetController.likeTilesetById);
router.put("/dislike/:id", Auth.verifyJWT, TilesetController.dislikeTilesetById);
router.put("/view/:id", TilesetController.viewTilesetById);



export default router;
