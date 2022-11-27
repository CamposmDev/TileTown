import Response from "../Response";
import { User } from "@types";

export default interface FavoriteTilesetRes extends Response {
    user?: User;
}