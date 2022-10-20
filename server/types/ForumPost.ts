/**
 * A type that defines a ForumPost object on our server.
 * @author Peter Walsh
 */
export default interface ForumPost {

    /** The id of the associated ForumPost in the DBMS */
    id: string,

    /** The id of the User who created the ForumPost in the DBMS */
    author:	string,

    /** The title of the ForumPost */
    title: string

    /** The text body of the ForumPost */
    body: string

    /** An array of tags (keywords) associated with the ForumPost */
    tags: string

    /** An array of User ids in the DBMS who have liked the ForumPost */
    likes: string[]

    /** An array of User ids in the DBMS who have disliked the ForumPost */
    dislikes: string[],

    /** A flag indicating whether this ForumPost has been published or not */
    isPublished: boolean,
    
}