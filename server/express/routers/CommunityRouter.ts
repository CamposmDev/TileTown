import { Router } from 'express';
import { CommunityController } from "../controllers";
import { Auth } from "../middleware";

const CommunityRouter: Router = Router();

CommunityRouter.get('/', Auth.verifyJWT, CommunityController.getCommunities);
CommunityRouter.get('/:id', Auth.verifyJWT, CommunityController.getCommunityById);

CommunityRouter.post('/', Auth.verifyJWT, CommunityController.createCommunity);
CommunityRouter.put('/:id', Auth.verifyJWT, CommunityController.updateCommunityById);
CommunityRouter.delete('/:id', Auth.verifyJWT, CommunityController.deleteCommunityById);

CommunityRouter.put('/join/:id', Auth.verifyJWT, CommunityController.joinCommunityById);
CommunityRouter.put('/leave/:id', Auth.verifyJWT, CommunityController.leaveCommunityById);

export default CommunityRouter;