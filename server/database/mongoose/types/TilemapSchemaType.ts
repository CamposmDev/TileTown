import { ObjectId } from "mongoose";
import LayerSchemaType from "./LayerSchemaType";
import PropertySchemaType from "./PropertySchemaType";

/**
 * A type for the Mongoose Tilemap Schema
 * @author Andrew Ojeda
 */
export default interface TilemapSchemaType {
  backgroundColor: string;
  collaborators: [ObjectId];
  collaboratorNames: [string];
  collaboratorSettings: {
    editMode: string;
    timeLimit: number;
    tileLimit: number;
  };
  collaboratorIndex: number;
  image: string;
  height: number;
  width: number;
  layers: [LayerSchemaType];
  tileHeight: number;
  tileWidth: number;
  nextLayerId: number;
  nextObjectId: number;
  name: string;
  owner: string;
  tilesets: [ObjectId];
  properties: [PropertySchemaType];
  renderOrder: number;
  isPublished: boolean;
}
