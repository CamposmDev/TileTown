import { Tileset } from "@types";
import Response from "../Response";

export default interface GetUnpublished extends Response {
    tilesets?: Tileset[]
}