import { Router } from "express";
import { TilemapController } from "../controllers";
import { Auth, Upload } from "../middleware";

const router: Router = Router();

router.get("/:id", Auth.verifyJWT, TilemapController.getTilemapById);
router.put("/:id", Auth.verifyJWT, Upload.single('image'), TilemapController.updateTilemapById);
router.post("/", Auth.verifyJWT, Upload.single('image'), TilemapController.createTilemap);
router.post("/publish/:id", Auth.verifyJWT, TilemapController.publishTilemap);
router.delete("/:id", Auth.verifyJWT, TilemapController.deleteTilemapById);

router.get("/social/:id", TilemapController.getTilemapSocialById);

router.get("/partials/:search/:sort", Auth.verifyJWT, TilemapController.getTilemapPartials);

router.post("/comment/:id", Auth.verifyJWT, TilemapController.commentTilemapById);

router.put("/favorite/:id", Auth.verifyJWT, TilemapController.favoriteTilemapById);
router.put("/unfavorite/:id", Auth.verifyJWT, TilemapController.unfavoriteTilemapById)

router.put("/like/:id", Auth.verifyJWT, TilemapController.likeTilemapSocialById);
router.put("/dislike/:id", Auth.verifyJWT, TilemapController.dislikeTilemapById);
router.put("/view/:id", TilemapController.viewTilemapById);

router.get("/download/tiled/:id", TilemapController.downloadTiledTilemap);

router.get(`/social/tmid/:id`, TilemapController.getTilemapSocialByTilemapId)
router.get(`/collaborations/:userId`, TilemapController.getUserCollaboratedTilemaps)

router.get(`/popular/top10`, TilemapController.getPopularTop10)

export default router;
