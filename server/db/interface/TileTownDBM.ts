import CommunityDBM from "./CommunityDBM";
import ContestDBM from "./ContestDBM";
import ForumDBM from "./ForumDBM";
import UserDBM from "./UserDBM";

/**
 * An interface defining a database manager for the TileTown application.
 * @author Peter Walsh
 */
export default interface TileTownDBM {

    /**
     * Establishes a connection our database or databases.
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

}