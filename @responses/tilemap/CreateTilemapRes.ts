import Response from "../Response";
import { Tilemap } from "@types";

export default interface CreateTilemapRes extends Response {
    tilemap?: Tilemap;
}