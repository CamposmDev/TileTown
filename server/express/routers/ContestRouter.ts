import { Router } from 'express';
import { ContestController } from '../controllers';

const ContestRouter: Router = Router();

ContestRouter.get("/:id", ContestController.getContestById);
ContestRouter.post("/", ContestController.createContest);
ContestRouter.put("/:id", ContestController.updateContestById);
ContestRouter.delete("/:id", ContestController.deleteContestById);

export default ContestRouter;