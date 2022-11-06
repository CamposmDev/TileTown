import { User } from '@types';

/**
 * An interface defining a set of methods to work with TileTown users in an arbitrary DBMS. 
 * @author Peter Walsh, Michael Campos
 */
export default interface UserDBM {

    /**
     * Gets the data associated with a user with the given id in a DBMS. 
     * 
     * @remarks
     * 
     * If the method is successful, the method returns a new User object with all of the information associated 
     * with the user in the DBMS. If the a user with the given id does not exist in the DBMS or the method fails 
     * for any reason, it returns null. 
     * 
     * @param userId the id of the user to get
     * @return a user object with all information about the user or null
     */
    getUserById(userId: string): Promise<User | null>;
    getUsersById(userIds: string[]): Promise<User[] | null>;

    getUserByEmail(email: string): Promise<User | null>;

    getUserByUsername(username: string): Promise<User | null>;
    getUsersByUsername(username: string): Promise<User[]>;

    /**
     * Creates a new user in the DBMS from the a partial User object. 
     * 
     * @remarks
     * 
     * If the method successfully creates a new user in the DBMS, the method returns a new User object with the data associated 
     * with the new user in the DBMS. 
     * 
     * If a new user could not be created in the DBMS from the given partial User object or the method fails for any reason, 
     * the method returns null.
     * 
     * @param user a partial User object
     * @return if successful, a new User object with the data associated with the newly created user in the DBMS; null otherwise
     */
    createUser(user: Partial<User>): Promise<User | null>;

    /**
     * Deletes a user in the DBMS using a given user ID
     * 
     * @remarks
     * If the method successfully deletes the user given the user ID, then the method returns true.
     * 
     * If there isn't a user that has the given user ID, then the method returns false
     * 
     * @param userId the id of the user to delete
     * @return if the user is deleted successfully, true; false otherwise
     */
    deleteUser(userId: string): Promise<boolean>

    /**
     * Verifies a user account in the DBMS with the given verification key. 
     * 
     * @remarks
     * 
     * If a user with the given verification key exists in the DBMS, the method verifies the user and returns 
     * true. If the user with the given verification key has already been verified, the method should still return
     * true. 
     * 
     * If a user with the given verification key does not exist or any other error occurs, the method returns false.
     * 
     * @param key the verification key
     * @return true if a users account was verified successfully; false otherwise.
     */
    // verifyUser(key: string): Promise<User | null>;

    updateUser(id: string, user: Partial<User>): Promise<User | null>

    /**
     * Updates the password of the user with the given user id in the DBMS to the given password
     * 
     * @remarks
     * 
     * If a user with the given user id exists in the DBMS and the password is a valid password, the method 
     * encrypts the password (ex. via salting or hashing), and saves the password as the user's new password in 
     * the DBMS. If nothing goes wrong, the method returns updated, encrypted password of the user. Also, the user must 
     * give the DBMS the user's old password to verify this is the appropiate owner of the user account.
     * 
     * If a user with the given user id does not exist in the DBMS or the password is not a valid password, or
     * the method fails to update the user's password for any reason, the method returns null.
     * 
     * @param userId the id of the user in the DBMS
     * @param oldPassword the user's old password to save the user from a hacker
     * @param newPassword the user's updated hashed password
     * @return the user's new hashed password if the user's password was updated successfully; null otherwise
     */
    // updatePassword(userId: string, oldPassword: string, newPassword: string): Promise<string | null>;

    /**
     * Updates the email address of the user with the given user id in a DBMS to the given email address.
     * 
     * @remarks
     * 
     * If a user with the given user id exists in the DBMS and the email is a valid email address, the method
     * updates the the email address of the user in the DBMS to the given email address. If nothing goes wrong,
     * the method returns the user's updated email address.
     * 
     * If a user with the given user id does not exist in the DBMS or the given email is not a valid email, or 
     * any other error occurs, the method returns null.
     * 
     * @param userId the id of the user in the DBMS
     * @param email the email address to update the user's email address to
     * @return if successful, the user's updated email address in the DBMS; null otherwise
     */
    // updateEmail(userId: string, email: string): Promise<string | null>;

    /**
     * Updates the username of the user with the given user id in a DBMS to the given username. 
     * 
     * @remarks
     * 
     * If a user with the given user id exists in the DBMS and the given username is a valid username, the method updates the 
     * the  username of the user in the DBMS to the given username. If nothing goes wrong, the method returns the user's 
     * updated username.
     * 
     * If a user with the given user id does not exist in the DBMS or the given username is not a valid username, or any 
     * other error occurs, the method returns null.
     * 
     * @param userId the id of the user in the DBMS
     * @param username the user's new username 
     * @return if successful, the user's updated username in the DBMS; null otherwise.
     */
    // updateUsername(userId: string, username: string): Promise<string | null>;

    /**
     * Adds a user with the given friend id as a friend of of a user with the given user id in a DBMS.
     * 
     * @remarks
     * 
     * If the user with the given user id exists in the DBMS and the user with the given friend id exists in the DBMS, the
     * method adds the user with the given friend id to the friends of the user with the given user id. If nothng goes wrong,
     * the method should return the user id of the users new friend in the DBMS.
     * 
     * If the user with the given user id does not exist in the DBMS or the user with the given friend id does not exist in the 
     * DBMS, or the method fails for any reason, the method returns null.
     * 
     * @param userId the id of the user in the DBMS
     * @param friendId the id of the friend the user wants to add as a friend in the DBMS
     * @return if successful, the id of the user's new friend in the DBMS; null otherwise
     */
    addFriend(userId: string, friendId: string): Promise<string | null>;

    /**
     * Adds a user with the given user id to the community with the given community id in the DBMS.
     * @author Michael Campos
     * 
     * @remarks
     * 
     * If a user with the given user id exists in the DBMS and a community with the given community id exists in the DBMS, 
     * the method adds the user with the given user id to the community with the given community id in the DBMS. If nothing
     * goes wrong, the method returns the id of the community in the DBMS the user with the given user id was added to.
     * 
     * If a user with the given user id does not exist in the DBMS or a community with the given community id does not exist
     * in the DBMS, or any other error occurs, the method returns null.
     * 
     * @param userId the id of the user in the DBMS
     * @param communityId the id of the community in the DBMS
     * @return if successful, the id of the community the user was added to in the DBMS; null otherwise.
     * 
     * 
     */
    // joinCommunity(userId: string, communityId: string): Promise<string | null>;

    /**
     * Removes a user with the given user id from a community with a given community id in the DBMS
     * @author Michael Campos
     * 
     * @remarks
     * If a user with the given user id exists in the DBMS and a community with a given community id exists in the DBMS,
     * then the method removes the community's id from the user's joined communities field. 
     * If the method sucessfully accomplishes this task, then the method returns true
     * 
     * If the given user id or community id does not exist in the DBMS, then the method returns false
     * 
     * @param userId 
     * @param communityId 
     * @return if successful, true; false otherwise
     */
    // leaveCommunity(userId: string, communityId: string): Promise<boolean>
    
    /**
     * Adds a user with the given user id to the contest with the given contest id in the DBMS.
     * 
     * @remarks
     * 
     * If a user with the given user id exists in the DBMS and a contest with the given contest id exists in the DBMS, 
     * the method adds the user with the given user id to the contest with the given contest id in the DBMS. If nothing
     * goes wrong, the method returns the id of the contest in the DBMS the user with the given user id was added to.
     * 
     * If a user with the given user id does not exist in the DBMS or a contest with the given contest id does not exist
     * in the DBMS, or any other error occurs, the method returns null.
     * 
     * @param userId the id of the user in the DBMS
     * @param contestId the id of the contest in the DBMS
     * @return if successful, the id of the contest the user was added to in the DBMS; null otherwise.
     */
    // joinContest(userId: string, contestId: string): Promise<string | null>;

    /**
     * Removes a user given a user id from a contest given a contest id in the DBMS
     * 
     * @remarks
     * If a user with the given user id exists in teh DBMS and a contest with the given contest id exists in the DBMS,
     * then the method removes the user's id from the contest and the contest's id is removed from the user's joinedContests field.
     * 
     * If the user id or the contest id does not exist in the DBMS, then the method returns false
     * 
     * @param userId the id of the user in the DBMS
     * @param contestId the id of the contest in the DBMS
     * @return if successful, true; false otherwise
     */
    // leaveContest(userId: string, contestId: string): Promise<boolean>

    /**
     * Adds a tilemap with the given tilemap id in the  favorited tilemaps field of the user with the given user id in the DBMS. 
     * 
     * @remarks
     * 
     * If a user with the given user id exists in the DBMS and a tilemap with the given tilemap id exists in the DBMS,
     * the method adds the tilemap with the given tilemap id to favoriated tilemaps of the user with the given user
     * id. If nothing goes wrong, the method returns the id of the tilemap added to the user's favoriated tilemaps.
     * 
     * If a user with the given user id does not exist in the DBMS or a tilemap with the given tilemap id does not exist
     * in the DBMS, or any other error occurs, the method returns null.
     * 
     * @param userId the id of the user in the DBMS
     * @param tilemapId the id of the tilemap in the DBMS
     * @return if successful, the id of the tilemap added to the user's favorited tilemaps; null otherwise.
     */
    // favoriteTilemap(userId: string, tilemapId: string): Promise<string | null>;

    /**
     * Removes a tilemap of a given tilemap id from the user's favorite tilemaps field given a user id in the DBMS
     * 
     * @remarks
     * If a user with the given user id exists in the DBMS and a tilemap with the given tilemap id exists in the DBMS,
     * then the method adds the tilemap's id to the user's favorite tileset field.
     * 
     * If the method is successful, then the method returns true.
     * If the user's id or tilemap's id does not exist in the DBMS, then the method returns false
     * 
     * @param userId the id of the user in the DBMS
     * @param tilemapId the id of the tilemap in the DBMS
     * @return if successful, true; false otherwise 
     */
    // unfavoriteTilemap(userId: string, tilemapId: string): Promise<boolean>

    /**
     * Adds a tileset with the given id to the favorited tilesets of the user with the given user id in a DBMS. 
     * 
     * @remarks
     * 
     * If the method successfully adds the tileset with the given tileset id to the favorited tilesets of the user
     * with the given user id, the method returns the id of the tileset added to the user's favorited tilesets. 
     * 
     * If a tileset with the given tileset id or a user with the given user id do not exist in the DBMS, or the 
     * method fails for any reason, the method returns null.
     * 
     * @param userId the id of the user in the DBMS
     * @param tilesetId the id of the tileset in the DBMS
     * @return if successful, the id of the tileset added to the user's favorited tilesets; null otherwise.
     */
    favoriteTileset(userId: string, tilesetId: string): Promise<string | null>;

    /**
     * Removes a tileset of a given tileset id from the user's favorite tilesets field given a user id in the DBMS
     * 
     * @remarks
     * If a user with the given user id exists in the DBMS and a tileset with the given tileset id exists in the DBMS,
     * then the method adds the tileset's id to the user's favorite tileset field.
     * 
     * If the method is successful, then the method returns true.
     * If the user's id or tileset's id does not exist in the DBMS, then the method returns false
     * 
     * @param userId the id of the user in the DBMS
     * @param tilesetId the id of the tileset in the DBMS
     * @return if successful, true; false otherwise 
     */
    unfavoriteTileset(userId: string, tilesetId: string): Promise<boolean>
}