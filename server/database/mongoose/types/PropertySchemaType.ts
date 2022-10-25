import { ObjectId } from "mongoose";

/**
 * A type for the Mongoose Property Schema
 * @author Andrew Ojeda
 */
export default interface PropertySchemaType {
  name: string;
  ptype: string;
  value: any;
}
