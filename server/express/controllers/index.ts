import ExpressUserController from './ExpressUserController';
import ExpressForumController from './ExpressForumController';
import ExpressContestController from './ExpressContestController';
import ExpressCommunityController from './ExpressCommunityController';
import ExpressTilemapController from './ExpressTilemapController';
import ExpressTilesetController from './ExpressTilesetController';


const UserController: ExpressUserController = new ExpressUserController();
const ForumController: ExpressForumController = new ExpressForumController();
const ContestController: ExpressContestController = new ExpressContestController();
const CommunityController: ExpressCommunityController = new ExpressCommunityController();
const TilemapController: ExpressTilemapController = new ExpressTilemapController();
const TilesetController: ExpressTilesetController = new ExpressTilesetController();


export { 
    UserController,
    ForumController,
    ContestController,
    CommunityController,
    TilemapController,
    TilesetController
}