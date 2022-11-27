import Response from "../Response";
import { User } from "@types";

export default interface UnFavoriteTilemapRes extends Response {
    user?: User
}