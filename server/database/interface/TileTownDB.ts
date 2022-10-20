import CommunityDBM from "./CommunityDBM";
import ContestDBM from "./ContestDBM";
import ForumDBM from "./ForumDBM";
import TilemapDBM from "./TilemapDBM";
import UserDBM from "./UserDBM";

/**
 * An interface defining a database manager for the TileTown application.
 * @author Peter Walsh
 */
export default interface TileTownDB {

    /**
     * Establishes a connection to a database or multiple databases.
     * @param args 
     */
    connect(...args: any): Promise<void> | void;

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

    /**
     * @return the tilemaps database manager assoociated with the TileTownDB
     */
    get tilemaps(): TilemapDBM;

    /**
     * @return the tilesets database manager associated with the TileTown
     */
    
}