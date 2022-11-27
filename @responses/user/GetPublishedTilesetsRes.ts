import Response from "../Response";
import { TilesetSocial } from "@types";

export default interface GetPublishedTilesetsRes extends Response {
    socials?: TilesetSocial[]
}