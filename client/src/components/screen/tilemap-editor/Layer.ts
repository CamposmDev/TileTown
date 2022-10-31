import Property from "./Property";

export default interface Layer {
  /**
   * A type that defines a layer object on our server.
   * @author Andrew Ojeda
   */

  /** An array of data corresponding to the tiles associated with the tilemap */
  data: number[];

  /** The height of the TileMap (in tiles) */
  height: number;

  /** The width of the TileMap (in tiles) */
  width: number;

  /** The name of the Layer*/
  name: string;

  /**The opacity of the TileMap */
  opacity: number;

  /** A flag indicating whether this TileMapLayer should be visible or not */
  properties: Property[];

  /** A flag indicating whether this TileSet has been published or not */
  visible: boolean;

  /** Horizontal layer offset in tiles. Always 0.*/
  x: 0;

  /** Vertical layer offset in tiles. Always 0.*/
  y: 0;
}
