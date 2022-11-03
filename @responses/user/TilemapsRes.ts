import Response from "./Response";
import { Tilemap } from "@types";

export default interface TilemapsRes extends Response {
    tilemaps?: Tilemap[]
}