import { ObjectId } from "mongoose";
import PropertySchemaType from "./PropertySchemaType";

/**
 * A type for the Mongoose Layer Schema
 * @author Andrew Ojeda
 */
export default interface LayerSchemaType {
  data: number[];
  height: number;
  width: number;
  name: string;
  opacity: number;
  properties: [PropertySchemaType];
  visible: boolean;
  x: number;
  y: number;
}
