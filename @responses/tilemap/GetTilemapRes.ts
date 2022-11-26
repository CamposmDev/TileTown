import Response from "../Response";
import { Tilemap } from "@types";

export default interface GetTilemapRes extends Response {
    tilemap?: Tilemap;
}