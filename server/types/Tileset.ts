import Property from "./Properties";

export default interface Tileset {
  /**
   * A type that defines a TileSet object on our server.
   * @author Andrew Ojeda
   */

  /** The id of the associated ForumPost in the DBMS */
  id: string;

  /** The number of tile columns in the tileset */
  columns: number;

  /** Date When tileset is first created */
  createdDate: Date;

  /** Date When tileset was last saved */
  lastSaveDate: Date;

  /** GID corresponding to the first tile in the set */
  firstgid: number;

  /** Image used for tiles in this set */
  image: string;

  /** The height of the TileSet (in tiles) */
  imageHeight: number;

  /** The width of the TileSet (in tiles) */
  imageWidth: number;

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
