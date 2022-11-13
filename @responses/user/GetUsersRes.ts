import { User } from "@types";
import Response from "../Response";

export default interface GetUsersRes extends Response {
    users?: User[]
}