import Response from "../Response";
import { TilemapSocial } from "@types";

export default interface GetTilemapRes extends Response {
    social?: TilemapSocial
}