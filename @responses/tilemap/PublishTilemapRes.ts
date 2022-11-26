import Response from "../Response";
import { TilemapSocial } from "@types";

export default interface PublishTilemapRes extends Response {
    social?: TilemapSocial;
}