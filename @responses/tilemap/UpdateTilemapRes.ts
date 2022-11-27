import Response from "../Response";
import { Tilemap } from "@types";

export default interface UpdateTilemapRes extends Response {
    tilemap?: Tilemap;
}