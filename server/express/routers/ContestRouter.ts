import { Router } from 'express';
import { ContestController } from '../controllers';
import { Auth } from "../middleware";

const ContestRouter: Router = Router();

ContestRouter.get("/:id", ContestController.getContestById);
ContestRouter.post("/", Auth.verifyJWT, ContestController.createContest);
ContestRouter.put("/:id", Auth.verifyJWT, ContestController.updateContestById);
ContestRouter.delete("/:id", Auth.verifyJWT, ContestController.deleteContestById);

export default ContestRouter;