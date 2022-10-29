import CommentDBM from "./managers/CommentDBM";
import CommunityDBM from "./managers/CommunityDBM";
import ContestDBM from "./managers/ContestDBM";
import ForumDBM from "./managers/ForumDBM";
import TilemapDBM from "./managers/TilemapDBM";
import TilesetDBM from "./managers/TilesetDBM";
import TilesetSocialDBM from "./managers/TilesetSocialDBM";
import UserDBM from "./managers/UserDBM";

/**
 * An interface defining a database manager for the TileTown application.
 * @author Peter Walsh
 */
export default interface TileTownDB {

    /**
     * Establishes a connection to a database
     * @param args 
     */
    connect(...args: any): Promise<void>;

    /** 
     * Closes the connection to a database 
     */
    disconnect(...args: any): Promise<void>;

    /**
     * @return the user database manager associated with this TileTown DBM
     */
    get users(): UserDBM

    /** 
     * @return the forum database manager associated with this TileTown DBM
     */
    get forums(): ForumDBM

    /** 
     * @return the contest database manager associated with this TileTown DBM
     */
    get contests(): ContestDBM

    /** 
     * @return the communities database manager associated with this TileTown DBM
     */
    get communities(): CommunityDBM

    get comments(): CommentDBM;
    
    /**
     * @return the tilemaps database manager assoociated with the TileTownDB
     */
    get tilemaps(): TilemapDBM;

    /**
     * @return the tilesets database manager associated with the TileTown
     */
    get tilesets(): TilesetDBM;

    get tilesetSocials(): TilesetSocialDBM;
    
}