import { Router } from 'express';
import { ContestController } from '../controllers';
import { Auth } from "../middleware";

const ContestRouter: Router = Router();

ContestRouter.get("/", ContestController.getContests);
ContestRouter.get("/:id", ContestController.getContestById);

ContestRouter.post("/", Auth.verifyJWT, ContestController.createContest);

ContestRouter.put("/:id", Auth.verifyJWT, ContestController.updateContestById);
ContestRouter.put("/join/:id", Auth.verifyJWT, ContestController.joinContest);
ContestRouter.put("/leave/:id", Auth.verifyJWT, ContestController.leaveContest);

ContestRouter.delete("/:id", Auth.verifyJWT, ContestController.deleteContestById);

ContestRouter.get('/submission/name/:type/:id', Auth.verifyJWT, ContestController.getContestNameForSubmission)

ContestRouter.get('/name/:id', Auth.verifyJWT, ContestController.getContestName)

ContestRouter.get(`/submitted/:id`, Auth.verifyJWT, ContestController.hasContestSubmission)

ContestRouter.get(`/submissions/tileset/:id`, ContestController.getContestTilesetSubmissionIds)
ContestRouter.get(`/submissions/tilemap/:id`, ContestController.getContestTilemapSubmissionIds)

export default ContestRouter;