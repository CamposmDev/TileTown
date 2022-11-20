import ExpressUserController from './ExpressUserController';
import ExpressForumController from './ExpressForumController';
import ExpressContestController from './ExpressContestController';
import ExpressCommunityController from './ExpressCommunityController';
import ExpressTilemapController from './ExpressTilemapController';
import ExpressTilesetController from './ExpressTilesetController';
import ExpressQueryController from './ExpressQueryController';


const UserController: ExpressUserController = new ExpressUserController();
const ForumController: ExpressForumController = new ExpressForumController();
const ContestController: ExpressContestController = new ExpressContestController();
const CommunityController: ExpressCommunityController = new ExpressCommunityController();
const TilemapController: ExpressTilemapController = new ExpressTilemapController();
const TilesetController: ExpressTilesetController = new ExpressTilesetController();
const QueryController: ExpressQueryController = new ExpressQueryController();


export { 
    UserController,
    ForumController,
    ContestController,
    CommunityController,
    TilemapController,
    TilesetController,
    QueryController
}

export { default as CommentController } from "./ExpressCommentController";