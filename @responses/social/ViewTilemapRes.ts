import Response from "../Response";
import { TilemapSocial } from "@types";

export default interface ViewTilemapRes extends Response {
    social?: TilemapSocial
}