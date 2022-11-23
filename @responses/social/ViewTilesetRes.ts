import Response from "../Response";
import { TilesetSocial } from "@types";

export default interface ViewTilesetRes extends Response {
    social?: TilesetSocial
}