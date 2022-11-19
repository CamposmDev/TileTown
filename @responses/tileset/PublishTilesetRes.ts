import Response from "../Response";
import { TilesetSocial } from "@types";

export default interface PublishTilesetRes extends Response {
    social?: TilesetSocial
}