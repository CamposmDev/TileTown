import { Contest } from "../../../types";
import ContestDBM from "../../interface/managers/ContestDBM";

export default class MongooseContestDBM implements ContestDBM {

    async getContest(contestId: string): Promise<Contest | null> {
        throw new Error("Method not implemented.");
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