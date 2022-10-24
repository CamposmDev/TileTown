import mongoose from "mongoose";
import LayerSchemaType from "../types/LayerSchemaType";

const PropertySchema = require("./Property").schema;
const Schema = mongoose.Schema;

/**
 * Data model for storing layer data
 * @author Andrew Ojeda
 * @
 */

const LayerSchema = new Schema<LayerSchemaType>({
  data: { type: [Number], required: true },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
  name: { type: String, required: true },
  opacity: { type: Number, required: true },
  properties: { type: [PropertySchema], required: true },
  visible: { type: Boolean, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

export default mongoose.model("Layer", LayerSchema);
