import Response from "../Response";
import { Tilemap } from "@types";

export default interface DeleteTilemapRes extends Response {
    tilemap?: Tilemap;
}