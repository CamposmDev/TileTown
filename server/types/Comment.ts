import { ObjectId } from "mongoose"

/**
 * A type that defines a Comment object on our server.
 * @author Tuyen Vo
 */
export default interface Comment {
    /** The author of the comment */
    author: ObjectId

    /** The title of the comment */
    title: string

    /** The content of the comment */
    body: string

    /** The id of the commentee */
    referenceId: ObjectId
}