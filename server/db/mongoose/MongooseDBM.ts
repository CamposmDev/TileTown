import mongoose, { ConnectOptions } from "mongoose";
import TileTownDBM from "../interface/TileTownDBM";
import MongooseCommunityDBM from "./MongooseCommunityDBM";
import MongooseContestDBM from "./MongooseContestDBM";
import MongooseForumDBM from "./MongooseForumDBM";
import MongooseUserDBM from "./MongooseUserDBM";

/**
 * The TileTown MongooseDatabaseManager. 
 * @author Peter Walsh
 */
export default class MongooseDBM implements TileTownDBM{

    protected static _instance: MongooseDBM | null = null;

    protected _connected: boolean;
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

    public static instance(): MongooseDBM {
        if (this._instance === null) {
            this._instance = new MongooseDBM();
        }
        return this._instance;
    }

    /**
     * Establishes a connection to an instance of MongoDB 
     * @param uri the url of our database; passed directly to mongoose.connect()
     * @param options mongoose connection options passed directly to mongoose.connect()
     * @returns 
     */
    public async connect(uri: string, options: ConnectOptions = {}): Promise<void> {
        if (!this._connected) {
            mongoose.connect(uri, options);
            mongoose.connection.on("error", console.error.bind(console, "MongoDB Connection Error"));
        }
        return;
    }

    get users(): MongooseUserDBM { return this._users; }
    get forums(): MongooseForumDBM { return this._forums; }
    get contests(): MongooseContestDBM { return this._contests; }
    get communities(): MongooseCommunityDBM { return this._communities; }
    
}