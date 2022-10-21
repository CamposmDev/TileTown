import mongoose from "mongoose";
const Schema = mongoose.Schema;
const PropertiesSchema = require("./properties");

/**
 * Data model for storing layer data
 * @author Andrew Ojeda
 * @
 */

const LayerSchema = new Schema({
  data: { type: Number, required: true },
  image: { type: String, required: true },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
  name: { type: String, required: true },
  opacity: { type: Number, required: true },
  properties: { type: PropertiesSchema, required: true },
  visible: { type: Boolean, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

exports = mongoose.model("Layer", LayerSchema);
