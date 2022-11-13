import { Community } from "@types";

export default interface GetCommunitiesRes {
    communities?: Community[];
    message: string
}