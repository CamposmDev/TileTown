import { Tilemap, Tileset, Layer, Property, Type } from "@types";

export default class TilemapParser {


    /**
     * Parses our internal representation of a tilemap to a Tiled tilemap object that can be
     * loaded into Tiled. 
     * 
     * IMPORTANT - we're going to use the Tiled 1.8 format. This could be important for 
     * backwards compatibility issues.
     * 
     * @param tilemap 
     * @param tilesets 
     */
    public static tiled(tilemap: Readonly<Tilemap>, tilesets: Readonly<Tileset>[]): TiledTilemap {
        return this.parseTiledTilemap(tilemap, tilesets);
    }

    protected static parseTiledTilemap(tilemap: Readonly<Tilemap>, tilesets: Readonly<Tileset>[], ): TiledTilemap {
        return {
            compressionlevel: -1,
            height: tilemap.height,
            infinite: false,
            nextlayerid: tilemap.nextLayerId,
            orientation: tilemap.orientation,
            renderorder: tilemap.renderOrder,
            tileheight: tilemap.tileHeight,
            tilewidth: tilemap.tileWidth,
            type: "map",
            width: tilemap.tileWidth,

            layers: tilemap.layers.map((layer, idx) => this.parseTiledLayer(idx + 1, layer)),
            tilesets: tilesets.map((tileset, idx) => this.parseTiledTileset(tilemap.globalTileIDs[idx], tileset)),

            tiledversion: "1.8",
            version: "1.3"
        }
    }


    protected static parseTiledTileset(gid: number, tileset: Readonly<Tileset>): TiledTileset {
        return {
            columns: tileset.columns,
            firstgid: gid,
            image: tileset.image,
            imageheight: tileset.imageHeight,
            imagewidth: tileset.imageWidth,
            margin: tileset.margin,
            name: tileset.name,
            spacing: 0,
            tilecount: 10,
            tilewidth: tileset.tileWidth,
            tileheight: tileset.tileHeight,

        }
    }

    protected static parseTiledLayer(id: number, layer: Readonly<Layer>): TiledLayer {
        return {
            data: layer.data,
            height: layer.height,
            width: layer.width,
            x: layer.x,
            y: layer.y, 
            name: layer.name,
            id: id,
            properties: layer.properties.map(property => this.parseTiledProperty(property)),
            opacity: layer.opacity,
            visible: layer.visible, 
            type: "tilelayer"
        };
    }

    protected static parseTiledProperty(property: Readonly<Property>): TiledProperty {
        let value: any;

        switch (property.ptype) {
            case "string": {
                value = property.value;
                break;
            }
            case "float": {
                value = parseFloat(property.value);
                break;
            }
            case "int": {
                value = parseInt(property.value);
                break;
            }
            case "bool": {
                value = property.value === "true" ? true : false;
                break;
            }
            case "object": {
                // Dangerous...
                value = JSON.parse(property.value);
                break;
            }
            case "color": {
                value = property.value;
                break;
            }
            default: {
                throw new Error("Unrecognized property type!");
            }
        }

        return {
            name: property.name,
            type: property.ptype,
            value: property.value
        }
    }

}

interface TiledParserOptions {
    // The version of tiled we're uploading to I think
    tiledversion: string;
    // The JSON version format? Not sure how to get/set this
    version: string;
}

interface TiledTilemap {
    compressionlevel: -1;
    height: number;
    infinite: boolean,
    layers: TiledLayer[];
    nextlayerid: number;
    orientation: string;
    renderorder: string;
    tiledversion: string;
    tileheight: number;
    tilewidth: number;
    tilesets: TiledTileset[],
    type: "map";
    version: string
    width: number
}

interface TiledLayer {
    data: number[];
    height: number;
    width: number;
    x: number;
    y: number;
    name: string;
    properties: TiledProperty[];
    id: number;
    opacity: number;
    visible: boolean;
    type: "tilelayer";
}

interface TiledProperty {
    name: string,
    type: string,
    value: any
}

interface TiledTileset {
    columns: number;
    firstgid: number;
    image: string;
    imageheight: number;
    imagewidth: number;
    margin: number;
    name: string;
    spacing: number;
    tilecount: number;
    tileheight: number;
    tilewidth: number;
}