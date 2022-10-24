import mongoose from "mongoose";
import LayerSchemaType from "./LayerSchemaType";
import PropertySchemaType from "./PropertySchemaType";

type ObjectId = mongoose.Types.ObjectId;

/**
 * A type for the Mongoose Tilemap Schema
 * @author Andrew Ojeda
 */
export default interface TilesetSchemaType {
  createdAt: Date;
  updatedAt: Date;
  columns: number;
  image: string;
  imageHeight: number;
  imageWidth: number;
  margin: number;
  name: string;
  owner: ObjectId;
  properties: { name: string; ptype: string; value: string }[];
  isPublished: boolean;
}
