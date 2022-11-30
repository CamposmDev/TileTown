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

ContestRouter.get('/name/:type/:id', Auth.verifyJWT, ContestController.getContestNameById)

export default ContestRouter;