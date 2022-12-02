import { Community, User } from "@types";

export default interface LeaveCommunityRes {
    message: string;
    community: Community;
    user: User
}