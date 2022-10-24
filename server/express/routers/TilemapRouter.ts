import { Router } from "express";
import { TilemapController } from "../controllers";
import { Auth } from "../middleware";

const router: Router = Router();

router.get("/:id", Auth.verifyJWT, TilemapController.getTilemapById);
router.get("/social/:id", TilemapController.getTilemapSocialStatsById);
router.get(
  "/pairs/:search/:sort",
  Auth.verifyJWT,
  TilemapController.getTilemapPartials
);

router.post("/", Auth.verifyJWT, TilemapController.createTilemap);
router.post("/comment/:id", TilemapController.commentTilemapById);

router.put("/:id", Auth.verifyJWT, TilemapController.updateTilemapById);
router.put("/like/:id", TilemapController.likeTilemapById);
router.put("/dislike/:id", TilemapController.dislikeTilemapById);
router.put("/view/:id", TilemapController.viewTilemapById);

router.delete("/:id", Auth.verifyJWT, TilemapController.deleteTilemapById);

export default router;
