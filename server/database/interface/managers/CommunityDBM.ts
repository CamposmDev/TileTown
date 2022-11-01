import { Community } from "../../../types";

/**
 * An interface defining a set of methods to work with TileTown communities in an arbitrary DBMS.
 * @author Peter Walsh
 */
export default interface CommunityDBM {
  /**
   * Gets all data associated with the community with the given community id in the DBMS.
   *
   * @remarks
   *
   * If a community with the given community id exists in the DBMS, the method returns a new Community object with all data
   * associated with the community in the DBMS with the given community id.
   *
   * If a community with the given community id does not exists in the DBMS or any other error occurs, the method returns null.
   *
   * @param communityId the id of the community in the DBMS
   * @return if successful, a new Community object with the data associated with the community in the DBMS
   */
  getCommunityById(communityId: string): Promise<Community | null>;
  getCommunityByName(name: string): Promise<Community | null>

  getCommunitiesById(communityIds: string[]): Promise<Community[]>;

  /**
   * Creates in a new community in the DBMS according to the given partial Community object.
   *
   * @remarks
   *
   * If the given partial Community object contains sufficient data to create a new community in the DBMS, the method creates
   * a new community in the DBMS from the given partial community object and returns a new Community object with all of the
   * data associated with the newly created community in the DBMS.
   *
   * If the given partial Community object is null or undefined or contains insufficient data for creating a new community in
   * the DBMS, or any other error occurs, the method returns null.
   *
   * @param community the partial community object
   * @return if successful, a new Community object with all of the data associated with the newly created community in the
   * DBMS; null otherwise
   */
  createCommunity(community: Partial<Community>): Promise<Community | null>;

  /**
   * Updates the community with the given community id in the DBMS according to the given partial Community object.
   *
   * @remarks
   *
   * If a community with the given communnity id exists in the DBMS and the given partial Community object contains sufficient
   * data to update the community, the method will update the community with the given community id in the DBMS according to
   * the data in the partial Community object and return a new Community object with the updated data associated with the
   * community in the DBMS.
   *
   * If a community with the given community id does not exist in the DBMS or the given partial Community object is null or
   * undefined or contains insufficient data to update the community, or any other error occurs the method returns null.
   *
   * @param communityId the id of the community in the DBMS
   * @param community the partial community object
   * @return if successful, a new Community object the updated data associated with the community; null otherwise
   */
  updateCommunity(
    communityId: string,
    community: Partial<Community>
  ): Promise<Community | null>;

  /**
   * Adds the user with the given user id to the community with the given community id.
   *
   * @remarks
   *
   * If a user with the given user id exists in the DBMS and a community with the given community id exists in the DBMS, the
   * method adds the user with the given user id to the community with the given community id in the DBMS. If nothing goes
   * wrong, the method returns the id of the community in the DBMS the user was added to.
   *
   * If a user with the given user id does not exist in the DBMS or a community with the given community id does not exist in
   * the DBMS, or any other error occurs, the method should return null.
   *
   * @param userId the id of the user in the DBMS
   * @param communityId the id of the community in the DBMS
   * @return if successful, the id of the community in the DBMS the user was added to.
   */
//   addCommunityMember(userId: string, communityId: string): Promise<string | null>;

  /**
   * Removes a user with the given user id from the community with the given community id.
   *
   * @remarks
   *
   * If a user with the given user id exists in the DBMS and a community with the given community id exists in the DBMS, the
   * method removes the user with the given user id from the community with the given community id in the DBMS. If nothing
   * goes wrong, the method returns the id of the community the user was removed from in the DBMS.
   *
   * If a user with the given user id does not exist in the DBMS or a community with the given community id does not exist in
   * the DBMS, or any other error occurs, the method returns null.
   *
   * @param userId the id of the user in the DBMS.
   * @param communityId the id of the community in the DBMS.
   * @return if successful, the id of the community in the DBMS the user was removed from; null otherwise
   */
//   removeCommunityMember(userId: string, communityId: string): Promise<boolean>;

    /**
     * Removes a user with the given user id from the community with the given community id.
     * 
     * @remarks
     * 
     * If a user with the given user id exists in the DBMS and a community with the given community id exists in the DBMS, the
     * method removes the user with the given user id from the community with the given community id in the DBMS. If nothing
     * goes wrong, the method returns the id of the community the user was removed from in the DBMS.
     * 
     * If a user with the given user id does not exist in the DBMS or a community with the given community id does not exist in
     * the DBMS, or any other error occurs, the method returns null.
     * 
     * @param userId the id of the user in the DBMS.
     * @param communityId the id of the community in the DBMS.
     * @return if successful, the id of the community in the DBMS the user was removed from; null otherwise
     */

    /**
     * Deletes the community with the given community id from the DBMS.
     * 
     * @remarks
     * 
     * If a community with the given id exists in the DBMS, the method will delete the community with the given community id in
     * the DBMS and, if nothing goes wrong, return the id of the deleted community.
     * 
     * If a community with the given id does not exist in the DBMS or any other error occurs, the method will return null. 
     * 
     * @param communityId the id of the community in the DBMS
     * @return if successful, the id of the deleted community; null otherwise
     */
     deleteCommunityById(communityId: string): Promise<Community | null>;

}
