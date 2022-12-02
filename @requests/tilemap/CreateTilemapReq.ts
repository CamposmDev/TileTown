import { Tilemap } from "@types";

export default interface CreateTilemapReq {
    tilemap: Partial<Tilemap> & {name: string}
}