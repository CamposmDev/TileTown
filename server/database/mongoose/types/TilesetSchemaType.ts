import { ObjectId } from "mongoose";
import LayerSchemaType from "./LayerSchemaType";
import PropertySchemaType from "./PropertySchemaType";

/**
 * A type for the Mongoose Tilemap Schema
 * @author Andrew Ojeda
 */
export default interface TilesetSchemaType {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  columns: number;
  image: string;
  imageHeight: number;
  imageWidth: number;
  margin: number;
  name: string;
  owner: ObjectId;
  properties: PropertySchemaType[];
  isPublished: boolean;
}
