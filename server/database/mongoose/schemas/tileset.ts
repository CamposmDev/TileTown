import mongoose from "mongoose";
import TilesetSchemaType from "../types/TilesetSchemaType";
const Schema = mongoose.Schema;
const PropertySchema = require("./properties").schema;

/**
 * Data model for storing Tileset data
 * @author Andrew Ojeda
 * @
 */

const TilesetSchema = new Schema<TilesetSchemaType>({
  columns: { type: Number, required: true },
  firstgid: { type: Number, required: true },
  image: { type: String, required: true },
  imageHeight: { type: Number, required: true },
  imageWidth: { type: Number, required: true },
  margin: { type: Number, required: true },
  name: { type: String, required: true },
  owner: { type: String, required: true },
  properties: { type: [PropertySchema], required: true },
  isPublished: { type: Boolean, required: true },
});

export = mongoose.model("Tileset", TilesetSchema);
