import { Contest } from "../../../types";
import { ContestDBM } from "../../interface";
import ContestSchema from '../../mongoose/schemas/contest'

/**
 * @author Tuyen Vo
 */

export default class MongooseContestDBM implements ContestDBM {

    async getContest(contestId: string): Promise<Contest | null> {
        let contest: any = await ContestSchema.findById({_id: contestId})
        return contest !== null ? {
            id: contest._id.toString(),
            owner: contest.owner.toString(),
            name: contest.name,
            description: contest.description,
            participates: contest.particpates,
            startDate: contest.startDate,
            endDate: contest.endDate,
            winner: contest.winner,
            isPublished: contest.isPublished
        } : null
    }
    async createContest(contest: Partial<Contest>): Promise<Contest | null> {
        throw new Error("Method not implemented.");
    }
    async updateContest(contestId: string, contest: Partial<Contest>): Promise<Contest | null> {
        throw new Error("Method not implemented.");
    }
    async updateMembers(contestId: string, members: string[]): Promise<string[] | null> {
        throw new Error("Method not implemented.");
    }
    async updateModerator(contestId: string, userId: string, role: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    async deleteContest(contestId: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }

}