import { Contest } from "../../../types";
import ContestDBM from "../../interface/managers/ContestDBM";

export default class MongooseContestDBM implements ContestDBM {

    getContest(contestId: string): Contest | null {
        throw new Error("Method not implemented.");
    }
    createContest(contest: Partial<Contest>): Contest | null {
        throw new Error("Method not implemented.");
    }
    updateContest(contestId: string, contest: Partial<Contest>): Contest | null {
        throw new Error("Method not implemented.");
    }
    updateMembers(contestId: string, members: string[]): string[] | null {
        throw new Error("Method not implemented.");
    }
    updateModerator(contestId: string, userId: string, role: string): string | null {
        throw new Error("Method not implemented.");
    }
    deleteContest(contestId: string): string | null {
        throw new Error("Method not implemented.");
    }

}