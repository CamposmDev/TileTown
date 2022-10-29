import mongoose, { ConnectOptions } from "mongoose";
import { TileTownDB } from "../interface";
import { 
    MongooseCommentDBM,
    MongooseCommunityDBM, 
    MongooseContestDBM, 
    MongooseForumDBM, 
    MongooseUserDBM,
    MongooseTilemapDBM,
    MongooseTilesetDBM,
    MongooseTilesetSocialDBM,
} from "./managers";
import MongooseTilemapSocialDBM from "./managers/MongooseTilemapSocialDBM";

/**
 * A database manager that works with TileTown data in MongoDB using Mongoose.
 * @author Peter Walsh
 * 
 * @remarks
 * 
 * The TileTown mongoose database manager is a singleton class that wraps around Mongoose and MongoDB. The 
 * class connects to the TileTownDBM interface
 */
export default class MongooseDB implements TileTownDB {

    /** A flag indicating whether a connection has been made to the database or not */
    protected _connected: boolean;

    /**  */
    protected _users: MongooseUserDBM;
    protected _forums: MongooseForumDBM;
    protected _communities: MongooseCommunityDBM;
    protected _contests: MongooseContestDBM;
    protected _tilemaps: MongooseTilemapDBM;
    protected _tilesets: MongooseTilesetDBM;
    protected _tilesetSocials: MongooseTilesetSocialDBM;
    protected _tilemapSocials: MongooseTilemapSocialDBM;
    protected _comments: MongooseCommentDBM;

    public constructor() {
        this._users = new MongooseUserDBM();
        this._forums = new MongooseForumDBM();
        this._communities = new MongooseCommunityDBM();
        this._contests = new MongooseContestDBM();
        this._tilemaps = new MongooseTilemapDBM();
        this._tilesets = new MongooseTilesetDBM();
        this._tilesetSocials = new MongooseTilesetSocialDBM();
        this._tilemapSocials = new MongooseTilemapSocialDBM();
        this._comments = new MongooseCommentDBM();
        this._connected = false;
    }

    /**
     * Establishes a connection to an instance of MongoDB 
     * @param uri the url of our database; passed directly to mongoose.connect()
     * @param options mongoose connection options passed directly to mongoose.connect()
     */
    public async connect(uri: string, options: ConnectOptions = {}): Promise<void> {
        if (!this._connected) {
            await mongoose.connect(uri, options);
            mongoose.connection.on("error", console.error.bind(console, "MongoDB Connection Error"));
        }
        return;
    }

    public async disconnect(): Promise<void> {
        await mongoose.connection.close()
    }

    /**
     * Gets the user database manager
     * @return the MongooseUserDBM 
     */
    get users(): MongooseUserDBM { return this._users; }
    get forums(): MongooseForumDBM { return this._forums; }
    get contests(): MongooseContestDBM { return this._contests; }
    get communities(): MongooseCommunityDBM { return this._communities; }
    get tilesets(): MongooseTilesetDBM { return this._tilesets; }
    get tilemaps(): MongooseTilemapDBM { return this._tilemaps; }
    get tilesetSocials(): MongooseTilesetSocialDBM { return this._tilesetSocials; }
    get tilemapSocials(): MongooseTilemapSocialDBM { return this._tilemapSocials; }
    get comments(): MongooseCommentDBM { return this._comments; }
}