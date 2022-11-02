/**
 * A type that defines a Comment object on our server.
 * @author Tuyen Vo, Peter Walsh
 */
export default interface Comment {
    /** The comments id in the database  */
    id: string
    /** The author of the comment */
    author: string

    /** The content of the comment */
    body: string

    /** The id of the commentee */
    referenceId: string
}