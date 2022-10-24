import { Router } from 'express';
import { CommunityController } from "../controllers";
import { Auth } from "../middleware";

const CommunityRouter: Router = Router();

CommunityRouter.get('/:id', Auth.verifyJWT, CommunityController.getCommunityById);
CommunityRouter.post('/', Auth.verifyJWT, CommunityController.createCommunity);
CommunityRouter.put('/:id', Auth.verifyJWT, CommunityController.updateCommunityById);
CommunityRouter.delete('/:id', Auth.verifyJWT, CommunityController.deleteCommunityById);

// CommunityRouter.get('/:id', CommunityController.getCommunityById);
// CommunityRouter.post('/', CommunityController.createCommunity);
// CommunityRouter.put('/:id', CommunityController.updateCommunityById);
// CommunityRouter.delete('/:id', CommunityController.deleteCommunityById);


export default CommunityRouter;