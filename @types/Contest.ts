
/**
 * A type that defines a Contest object on our server.
 * @author Peter Walsh
 */
export default interface Contest {
    /** The id of the Contest in the DBMS */
    id: string,

    /** The id of the User in the DBMS who owns the Contest */
    owner: string,

    /** The id of the User in the DBMS who won the Contest */
    winner: string

    /** The name of the Contest */
    name: string,

    /** The textual description of the Contest */
    description: string

    /** The number of participating users of the contest */
    participates: string[]

    /** The starting date of the Contest */
    startDate: Date

    /** The end date of the Contest */
    endDate: Date

    /** The type of of the Contest */
    type: string

    /** A flag indicating whether the Contest has been published or not */
    isPublished: boolean

}