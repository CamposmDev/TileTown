import Response from "../Response";
import { TilesetSocial } from "@types";

export default interface GetTilesetRes extends Response {
    social?: TilesetSocial
}