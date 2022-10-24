import mongoose from "mongoose";
import PropertySchemaType from "../types/PropertySchemaType";
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

/**
 * Data model for storing properties data
 * @author Andrew Ojeda
 * @
 */

const PropertySchema = new Schema<PropertySchemaType>({
  name: { type: String, required: true },
  ptype: { type: String, required: true },
  value: { type: Mixed, required: true },
});

export default mongoose.model("Property", PropertySchema);
