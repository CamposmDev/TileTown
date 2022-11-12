import { User } from "@types";
import Response from "../Response";

export default interface RemoveFriendRes extends Response {
    user?: User;
}