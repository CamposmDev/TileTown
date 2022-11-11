import { User } from "@types";
import Response from "../Response";

export default interface SearchUsersRes extends Response {
    users?: User[];
}