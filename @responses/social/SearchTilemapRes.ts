import Response from "../Response";
import { TilemapSocial } from "@types";

export default interface SearchTilemapRes extends Response {
    socials?: TilemapSocial[];
}