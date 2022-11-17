import Property from "./Properties";

export default interface Tileset {
  /**
   * A type that defines a TileSet object on our server.
   * @author Andrew Ojeda
   */

  /** The id of the associated Tileset in the DBMS */
  id: string;

  /** The number of tile columns in the tileset */
  columns: number;

  /**The number of tile rows in the tileset */
  rows: number;

  /** Date When tileset is first created */
  createDate: Date;

  /** Date When tileset was last saved */
  lastSaveDate: Date;

  /** Image used for tiles in this set */
  image: string;

  /** The height of the TileSet (in tiles) */
  imageHeight: number;

  /** The width of the TileSet (in tiles) */
  imageWidth: number;

  /** The height of the tiles in pixels */
  tileHeight: number;

  /** The width of the tiles in pixels */
  tileWidth: number;

  /** The margin of the TileSap (in tiles) */
  margin: number;

  /** The name of the TileSet*/
  name: string;

  /** Represents the id of the user who is the owner of the tile set */
  owner: string;

  /** Represents an array of properties of the tile set */
  properties: Property[];

  /** A flag indicating whether this TileSet has been published or not */
  isPublished: boolean;
}
