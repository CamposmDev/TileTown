import { Router } from 'express';
import { CommunityController } from "../controllers";

const CommunityRouter: Router = Router();

CommunityRouter.get('/:id', CommunityController.getCommunityById);
CommunityRouter.post('/', CommunityController.createCommunity);
CommunityRouter.put('/:id', CommunityController.updateCommunityById);
CommunityRouter.delete('/:id', CommunityController.deleteCommunityById);

export default CommunityRouter;