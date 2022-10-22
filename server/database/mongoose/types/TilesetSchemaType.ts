import { ObjectId } from "mongoose";
import LayerSchemaType from "./LayerSchemaType";
import PropertySchemaType from "./PropertySchemaType";

/**
 * A type for the Mongoose Tilemap Schema
 * @author Andrew Ojeda
 */
export default interface TilesetSchemaType {
  columns: number;
  firstgid: number;
  image: string;
  imageHeight: number;
  imageWidth: number;
  margin: number;
  name: string;
  owner: string;
  properties: [PropertySchemaType];
  isPublished: boolean;
}
