import { Community, User } from "@types";

export default interface JoinCommunityRes {
    message: string;
    community: Community;
    user: User
}