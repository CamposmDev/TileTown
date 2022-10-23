import Property from "./Properties";
import Layer from "./Layer";
import Tileset from "./Tileset";

export type Orientation =
  | "orthogonal"
  | "isometric"
  | "staggered"
  | "hexagonal";
export type EditMode = "free" | "queue";
export type CollaboratorSettings = {
  editMode: EditMode;
  timeLimit: number;
  tileLimit: number;
};
export type RenderOrder = "right-down" | "right-up" | "left-down" | "up";

export default interface Tilemap {
  /**
   * A type that defines a Tilemap object on our server.
   * @author Andrew Ojeda
   */

  /** The id of the associated Tilemap in the DBMS */
  id: string;

  /** The background color of the TileMap */
  backgroundColor: Color;

  /** ObjectID of users who have collaborator permissions enabled for this TileMap project. */
  collaborators: string[];

  /** Names of users who have collaborator permissions enabled for this TileMap project. */
  collaboratorNames: string[];

  /** Settings that determine who can edit the map, how much time per edit, and how many tiles per edit*/
  collaboratorSettings: CollaboratorSettings;

  /** Index of which user can current edit tilemap, -1 if any user has permission*/
  collaboratorIndex: number;

  /** Date When tilemap was created*/
  createDate: Date;

  /** Date When tilemap was last saved */
  lastSaveDate: Date;

  /** Image URL of tilemap*/
  image: string;

  /** The height of the Tilemap (in tiles) */
  height: number;

  /** The width of the Tilemap (in tiles) */
  width: number;

  /** A list of Layers in this TileMap */
  layers: Layer[];

  /** The height of the Tiles in the tilesets */
  tileHeight: number;

  /** The width of the Tiles in the tilesets*/
  tileWidth: number;

  /** Auto-increments for each placed layer */
  nextLayerId: number;

  /** Auto-increments for each placed object */
  nextObjectId: number;

  /** The orientation of this TileMap */
  orientation: Orientation;

  /** The name of the TileSet*/
  name: string;

  /** Represents the id of the user who is the owner of the tile set */
  owner: string;

  /** Represents an array of properties of the tile set */
  properties: Property[];

  /** Array of tilesets ids used in tilemap */
  tilesets: string[];

  /** The order in which the tiles for this TileMap should be rendered*/
  renderOrder: RenderOrder;

  /** A flag indicating whether this TileSet has been published or not */
  isPublished: boolean;
}
