import { Router } from "express";
import { TilemapController } from "../controllers";

const router: Router = Router();

router.get("/:id", TilemapController.getTilemapById);
router.get("/social/:id", TilemapController.getTilemapSocialStatsById);
router.get("/pairs/:search/:sort", TilemapController.getTilemapPartials);

router.post("/", TilemapController.createTilemap);
router.post("/comment/:id", TilemapController.commentTilemapById);

router.put("/:id", TilemapController.updateTilemapById);
router.put("/like/:id", TilemapController.likeTilemapById);
router.put("/dislike/:id", TilemapController.dislikeTilemapById);
router.put("/view/:id", TilemapController.viewTilemapById);

router.delete("/:id", TilemapController.deleteTilemapById);

export default router;
