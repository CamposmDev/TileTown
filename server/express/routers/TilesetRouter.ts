import { Router } from "express";
import { TilesetController } from "../controllers";
import { Auth } from "../middleware";

const router: Router = Router();

router.get("/:id", Auth.verifyJWT, TilesetController.getTilesetById);
router.get(
  "/pairs/:search/:sort",
  Auth.verifyJWT,
  TilesetController.getTilesetPartials
);
router.get("/social/:id", TilesetController.getTilesetSocialStatsById);

router.post("/", Auth.verifyJWT, TilesetController.createTileset);
router.post("/comment/:id", TilesetController.commentTilesetById);

router.put("/:id", Auth.verifyJWT, TilesetController.updateTilesetById);
router.put("/like/:id", TilesetController.likeTilesetById);
router.put("/dislike/:id", TilesetController.dislikeTilesetById);
router.put("/view/:id", TilesetController.viewTilesetById);

router.delete("/:id", Auth.verifyJWT, TilesetController.deleteTilesetById);

export default router;
