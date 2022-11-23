import Response from "../Response";
import { TilemapSocial } from "@types";

export default interface LikeTilemapRes extends Response {
    social?: TilemapSocial
}