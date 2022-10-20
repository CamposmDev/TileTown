import Tilemap from "../../../types/Tilemap";

export default interface TilemapDBM {
    
    getTilemapById(tilemapId: string): Tilemap;

    createTilemap(tilemap: Partial<Tilemap>): Tilemap;

    
}