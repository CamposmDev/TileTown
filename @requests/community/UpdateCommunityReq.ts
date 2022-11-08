import { Community } from "@types";

export default interface UpdateCommunityReq {
    community: Partial<Community>
}