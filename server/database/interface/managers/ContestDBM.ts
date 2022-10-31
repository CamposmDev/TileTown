import { Contest } from "../../../types";

/**
 * An interface defining a set of methods to work with TileTown contests in an arbitrary DBMS.
 * @author Peter Walsh
 */
export default interface ContestDBM {

    /**
     * Gets a the data associated with a contest in a DBMS with the given contest id.
     * 
     * @remarks
     * 
     * If a contest with the given contest id exists in the DBMS, the method returns a new Contest object with all of the data 
     * associated with the contest. 
     * 
     * If the contest with the given contest id does not exist in the DBMS or an error occurs the method returns null.
     * 
     * @param contestId 
     */
    getContestById(contestId: string): Promise<Contest | null>;
    getContestByName(name: string): Promise<Contest | null>;

    /**
     * Creates a new contest in the DBMS based on the given partial Contest object.
     * 
     * @remarks
     * 
     * If the partial Contest object contains the necessary information to create a new contest in the DBMS, the method will
     * create a new contest in the DBMS and return a new Contest object with the data associated with the newly created 
     * contest. 
     * 
     * If the partial contest is null or undefined or does not contain sufficient data to create a new contest in the DBMS, 
     * or any other error occurs, the method returns null.
     * 
     * @param contest the partial Contest object
     * @return if successful, a new Contest object with the data associated with the new contest in the DBMS; null otherwise.
     */
    createContest(contest: Partial<Contest>): Promise<Contest | null>;

    /**
     * Updates the contest with the given contest id in the DBMS according the given partial Contest object.
     * 
     * @remarks
     * 
     * If a contest with the given contest id exists in the DBMS and the partial Contest object contains valid contest data,
     * the method updates the contest with the given contest id in the DBMS according to the data given in the partial Contest
     * object. If nothing goes wrong, the method returns a new Contest object with the data associated with the contest in the
     * DBMS. 
     * 
     * If the contest with the given contest id does not exist in the DBMS or the partial Contest object contains invalid contest
     * data, or any other error occurs, the method returns null.
     * 
     * @param contestId the id of the contest in the DBMS
     * @param contest the partial Contest object
     * @return if successful, a new Contest object with the updated data associated with the contest in the DBMS; null otherwise.
     */
    updateContest(contestId: string, contest: Partial<Contest>): Promise<Contest | null>;

    /**
     * Updates the role of the user with the given user id in the contest with the given contest id.
     * 
     * @remarks
     * 
     * If a contest with the given contest id exists in the DBMS and a user with the given user id exists in the DBMS and the
     * given role is a valid role, the method updates the role of the user with the given user id in the contest with the
     * given contest id. If nothing goes wrong, the method returns the updated role of the user in the contest.
     * 
     * If a contest with the given contest id does not exist in the DBMS or a user with the given user id does not exist in the
     * DBMS or the given role is not a valid role, the method returns null.
     * 
     * @param contestId the id of the contest in the DBMS
     * @param userId the id of the user in the DBMS
     * @param role the new role of the user in the contest
     * @return if successful, the updated role of the user in the given contest; null otherwise
     */
    // updateModerator(contestId: string, userId: string, role: string): Promise<string | null>;

    /**
     * Deletes the contest with the given contest id in the DBMS.
     * 
     * @remarks
     * 
     * If a contest with the given contest id exists in the DBMS, the method handles deleting the contest. If a contest with
     * the given contest id does not exist in the DBMS or any other error occurs, the method returns null.
     * 
     * @param contestId the id of the contest in the DBMS
     * @return if successful, true; false otherwise.
     */
    deleteContest(contestId: string): Promise<Contest | null>;
}