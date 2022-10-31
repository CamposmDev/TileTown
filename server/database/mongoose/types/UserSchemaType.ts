import mongoose, { Document } from "mongoose";

type ObjectId = mongoose.Types.ObjectId;

/**
 * A type for the Mongoose User Schema
 * @author Peter Walsh
 */
export default interface UserSchemaType {

  /** The user's username */
  username: string;

  /** The users email address */
  email: string;

  /** The users first name*/
  firstName: string;

  /** The user's last name */
  lastName: string;

  /** The user's hashed password */
  password: string;

  /** A string URL to the user's profile picture */
  imageURL: string;

  tilemaps: ObjectId[],

  tilesets: ObjectId[],

  /** A list of tilemap ids in the DBMS the user has favorited */
  favoriteTileMaps: ObjectId[];

  /** A list of tileset ids in the DBMS the user has favorited */
  favoriteTileSets: ObjectId[];

  /** A list of user ids in the DBMS the user has added as friends */
  friends: ObjectId[];

  /** A flag indicating whether or not the user has verified their account */
  isVerified: boolean;

  /** The user's verification key */
  verifyKey: string;

  /** A list of community ids in the DBMS the user has joined */
  joinedCommunities: ObjectId[];

  /** A list of contest ids in the DBMS the user has joined */
  joinedContests: ObjectId[];
}
