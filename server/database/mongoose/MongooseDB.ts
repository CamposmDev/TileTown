import mongoose, { ConnectOptions } from "mongoose";
import { Community, User } from "../../types";
import TilemapDBM from "../interface/TilemapDBM";
import TileTownDB from "../interface/TileTownDB";
import MongooseCommunityDBM from "./MongooseCommunityDBM";
import MongooseContestDBM from "./MongooseContestDBM";
import MongooseForumDBM from "./MongooseForumDBM";
import MongooseUserDBM from "./MongooseUserDBM";

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

    /** The instance of the MongooseDBM */
    protected static _instance: MongooseDB | null = null;

    /** A flag indicating whether a connection has been made to the database or not */
    protected _connected: boolean;

    /**  */
    protected _users: MongooseUserDBM;
    protected _forums: MongooseForumDBM;
    protected _communities: MongooseCommunityDBM;
    protected _contests: MongooseContestDBM;

    private constructor() {
        this._users = new MongooseUserDBM();
        this._forums = new MongooseForumDBM();
        this._communities = new MongooseCommunityDBM();
        this._contests = new MongooseContestDBM();
        this._connected = false;
    }
    get tilemaps(): TilemapDBM {
        throw new Error("Method not implemented.");
    }

    public static instance(): MongooseDB {
        if (this._instance === null) {
            this._instance = new MongooseDB();
        }
        return this._instance;
    }

    /**
     * Establishes a connection to an instance of MongoDB 
     * @param uri the url of our database; passed directly to mongoose.connect()
     * @param options mongoose connection options passed directly to mongoose.connect()
     */
    public async connect(uri: string, options: ConnectOptions = {}): Promise<void> {
        if (!this._connected) {
            mongoose.connect(uri, options);
            mongoose.connection.on("error", console.error.bind(console, "MongoDB Connection Error"));
        }
        return;
    }

    /**
     * Gets the user database manager
     * @return the MongooseUserDBM 
     */
    get users(): MongooseUserDBM { return this._users; }
    get forums(): MongooseForumDBM { return this._forums; }
    get contests(): MongooseContestDBM { return this._contests; }
    get communities(): MongooseCommunityDBM { return this._communities; }
    
}