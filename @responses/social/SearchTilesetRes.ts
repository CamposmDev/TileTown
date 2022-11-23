import Response from "../Response";
import { TilesetSocial } from "@types";

export default interface SearchTilesetRes extends Response {
    socials?: TilesetSocial[];
}