import Response from "../Response";
import { User } from "@types";

export default interface UpdateProfileRes extends Response {
    user?: User
}