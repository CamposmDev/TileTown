import { ForumPost } from "../../../types";
import Comment from "../../../types/Comment";

/**
 * An interface defining a set of methods to work with TileTown forum posts in an arbitrary DBMS.
 * @author Peter Walsh
 */
export default interface ForumDBM {
  /**
   * Gets a ForumPost by the id of the post in the DBMS.
   *
   * @remarks
   *
   * If a forum post with the given id exists in the DBMS, the method returns a ForumPost object
   * containing all the data about the forum post. If a forum post with the given id does not exist
   * in the DBMS or the method fails for any reason, the method returns null.
   *
   * @param forumPostId the id of the forum post in the DBMS
   * @return if successful, a ForumPost object with all the data about the forum post; null otherwise
   */
  getForumPost(forumPostId: string): Promise<ForumPost | null>;

  /**
   * Creates a new forum post based on the given partial forum post in the DBMS.
   *
   * @remarks
   *
   * If a new forum post is successfully created in the DBMS from the given partial forum post, the
   * method returns a new ForumPost object with all the data associated with the forum post in the
   * DBMS. If a new forum post could not be created in the DBMS from the given partial forum post or
   * the method fails for any reason, the method returns null.
   *
   * @param forumPost the partial forum post
   * @return if successful, the newly created ForumPost; null otherwise.
   */
  createForumPost(forumPost: Partial<ForumPost>): Promise<ForumPost | null>;

  /**
   * Updates a forum post in the DBMS with the given id based on the given partial forum post.
   *
   * @remarks
   *
   * If the forum post with the given id exists and was successfully updated, the function returns a
   * new ForumPost object. If the forum post with the given id does not exist in the DBMS, or could
   * not be updated for any reason, the function returns null.
   *
   * @param forumPostId the id of the forum post in the DBMS
   * @param forumPost the partial forum post
   * @return if successful, a ForumPost object containing the updated contents of the forum post in
   * the DBMS; null otherwise.
   */
  updateForumPost(
    forumPostId: string,
    forumPost: Partial<ForumPost>
  ): Promise<ForumPost | null>;

  /**
   * Deletes a forum post in the DBMS with the given id.
   *
   * @remarks
   *
   * If the forum post with the given id exists in the DBMS, the method should delete the forum post
   * from the DBMS and return the id of the deleted forum post. If a forum post with the given id
   * does not exist in the DBMS or the forum post with the given id could not be deleted for any
   * reason, the method returns null.
   *
   * @param forumPostId the id of the forum post in the DBMS
   * @return if successful, the id of the forum post that was deleted in the DBMS
   */
  deleteForumPost(forumPostId: string): Promise<string | null>;

  /**
   * Adds a like from the user with the given user id to the forum post with the given forum post id.
   *
   * @remarks
   *
   * If a forum post with the given id exists in the DBMS and a user with the given user id exists in
   * the DBMS, the method adds a like from the user with the given user id to the forum post with the
   * given forum post id. If nothing goes wrong, the method returns a new ForumPost object containing
   * the data associated with the updated forum post.
   *
   * If the user with the given user id or forum post with the given forum post id do not exist in the
   * DBMS, or anything else goes wrong, the function returns null.
   *
   * @param userId the id of the user in the DBMS
   * @param forumPostId the id of the forumm post in the DBMS
   * @return if successful, the ForumPost object with the data associated with the forum post in the
   * DBMS; null otherwise.
   */
  toggleLike(userId: string, forumPostId: string): Promise<ForumPost | null>;

  /**
   * Adds a dilike from the user with the given user id to the forum post with the given forum post id.
   *
   * @remarks
   *
   * If a forum post with the given id exists in the DBMS and a user with the given user id exists in
   * the DBMS, the method adds a dislike from the user with the given user id to the forum post with the
   * given forum post id. If nothing goes wrong, the method returns a new ForumPost object containing
   * the data associated with the updated forum post.
   *
   * If the user with the given user id or forum post with the given forum post id do not exist in the
   * DBMS, or anything else goes wrong, the function returns null.
   *
   * @param userId the id of the user in the DBMS
   * @param forumPostId the id of the forumm post in the DBMS
   * @return if successful, the ForumPost object with the data associated with the forum post in the
   * DBMS; null otherwise.
   */
  toggleDislike(userId: string, forumPostId: string): Promise<ForumPost | null>;

  /**
   * Adds a view from the user with the given user id to the forum post with the given forum post id.
   *
   * @remarks
   *
   * If a user with the given user id and a forum post with the given forum post exist in the DBMS, the
   * function should add a view from the user to the forum post and return a new ForumPost object with
   * the data associated with the updated forum post.
   *
   * If a user with the given user id or a forum post with the given id do not exist in the DBMS, or
   * anything else goes wrong, the function returns null.
   *
   * @param userId the id of the user in the DBMS
   * @param forumPostId the id of the forum post in the DBMS
   * @return if successful, a new ForumPost object with the updated forum post data; null otherwise.
   */
  addView(userId: string, forumPostId: string): Promise<ForumPost | null>;


  /**
   * Creates a comment with a given forumPost id and a payload
   * 
   * @param forumPostId the id of the forum post in the DBMS
   * @param payload the data of the comment
   * @return if successful, 
   */
  commentForumPostById(forumPostId: string, payload: Comment): Promise<Comment | null>
}
