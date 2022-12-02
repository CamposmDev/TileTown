import Response from "../Response";
import { User } from "@types";

export default interface UnFavoriteTilesetRes extends Response {
    user?: User
}