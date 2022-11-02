import Response from "./Response";
import { User } from "@types";

export default interface RegisterRes extends Response {
    user?: User
}