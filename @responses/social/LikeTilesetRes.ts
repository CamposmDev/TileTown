import Response from "../Response";
import { TilesetSocial } from "@types";

export default interface LikeTilesetRes extends Response {
    social?: TilesetSocial
}