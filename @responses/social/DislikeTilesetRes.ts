import Response from "../Response";
import { TilesetSocial } from "@types";

export default interface DislikeTilesetRes extends Response {
    social?: TilesetSocial
}