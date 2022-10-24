import mongoose from "mongoose";
import LayerSchemaType from "./LayerSchemaType";
import PropertySchemaType from "./PropertySchemaType";

type ObjectId = mongoose.Types.ObjectId;

/**
 * A type for the Mongoose Tilemap Schema
 * @author Andrew Ojeda
 */
export default interface TilemapSchemaType {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  backgroundColor: string;
  collaborators: ObjectId[];
  collaboratorNames: string[];
  collaboratorSettings: {
    editMode: string;
    timeLimit: number;
    tileLimit: number;
  };
  collaboratorIndex: number;
  image: string;
  height: number;
  width: number;
  layers: {
    data: number[];
    height: number;
    width: number;
    name: string;
    opacity: number;
    properties: { name: string; type: string; value: string }[];
    visible: boolean;
    x: number;
    y: number;
  }[];
  tileHeight: number;
  tileWidth: number;
  nextLayerId: number;
  nextObjectId: number;
  orientation: string;
  name: string;
  owner: string;
  tilesets: ObjectId[];
  properties: { name: string; type: string; value: string }[];
  globalTileIDs: number[];
  renderOrder: string;
  isPublished: boolean;
}
