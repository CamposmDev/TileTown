import { User } from "@types";
import Response from "../Response";

export default interface AddFriendRes extends Response {
    user?: User;
}