import { Contest } from "@types";

export default interface UpdateContestReq {
    contest: Partial<Contest>
}