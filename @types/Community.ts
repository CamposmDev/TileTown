/**
 * A type that defines a Community object on our server.
 * @author Peter Walsh
 */
export default interface Community {

    /** The id of the Community in the DBMS */
    id: string,

    /** The user id in the DBMS who owns the Community */
    owner: string,

    /** The name of the Community */
    name: string,

    /** The description of the Community */
    description: string,

    /** The number of members who are in the Community */
    members: string[]

    /** The visibility of the Community */
    visibility: string

   /** The number of members who are banned from the community */
    banned: string[]
}