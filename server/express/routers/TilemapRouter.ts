import { Router } from "express";
import { TilemapController } from "../controllers";
import { Auth, Upload } from "../middleware";

const router: Router = Router();

router.get("/:id", Auth.verifyJWT, TilemapController.getTilemapById);
router.put("/:id", Auth.verifyJWT, TilemapController.updateTilemapById);
router.post("/", Auth.verifyJWT, Upload.single('image'), TilemapController.createTilemap);
router.delete("/:id", Auth.verifyJWT, TilemapController.deleteTilemapById);

router.get("/social/:id", TilemapController.getTilemapSocialById);
router.get("/partials/:search/:sort", Auth.verifyJWT, TilemapController.getTilemapPartials);
router.post("/comment/:id", Auth.verifyJWT, TilemapController.commentTilemapById);
router.put("/like/:id", Auth.verifyJWT, TilemapController.likeTilemapSocialById);
router.put("/dislike/:id", Auth.verifyJWT, TilemapController.dislikeTilemapById);
router.put("/view/:id", TilemapController.viewTilemapById);

export default router;
