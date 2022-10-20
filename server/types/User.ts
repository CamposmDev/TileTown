/**
 * A type that defines a User object on our server.
 * @author Peter Walsh
 */
export default interface User {
    /** The id of the user in the DBMS as a string */
    id: string,

    /** The user's username */
    username: string

    /** The users email address */
    email: string,

    /** The users first name*/
    firstName: string,

    /** The user's last name */
    lastName: string

    /** The user's hashed password */
    password: string

    /** A string URL to the user's profile picture */
    profilePicture: string

    /** A list of tilemap ids in the DBMS the user has favorited */
    favoriteTileMaps: string[],

    /** A list of tileset ids in the DBMS the user has favorited */
    favoriteTileSets: string[],

    /** A list of user ids in the DBMS the user has added as friends */
    friends: string[],

    /** A flag indicating whether or not the user has verified their account */
    isVerified: boolean,

    /** The user's verification key */
    verifyKey: string,

    /** A list of community ids in the DBMS the user has joined */
    joinedCommunities: string[],

    /** A list of contest ids in the DBMS the user has joined */
    joinedContests: string[],

}