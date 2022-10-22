import { ObjectId } from "mongoose";

/**
 * A type for the Mongoose Property Schema
 * @author Andrew Ojeda
 */
export default interface PropertySchemaType {
  name: string;
  type: string;
  value: any;
}
