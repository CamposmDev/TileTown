import Response from "@responses/Response";
import { User } from "@types";

export default interface FavoriteTilemapRes extends Response {
    user?: User
}