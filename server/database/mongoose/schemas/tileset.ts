import mongoose from "mongoose";
import TilesetSchemaType from "../types/TilesetSchemaType";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const PropertySchema = require("./Property").schema;

/**
 * Data model for storing Tileset data
 * @author Andrew Ojeda
 * @
 */

const TilesetSchema = new Schema<TilesetSchemaType>({
  columns: { type: Number, required: true },
  image: { type: String, required: true },
  imageHeight: { type: Number, required: true },
  imageWidth: { type: Number, required: true },
  margin: { type: Number, required: true },
  name: { type: String, required: true },
  owner: { type: ObjectId, required: true, ref: "UserSchema" },
  properties: { type: [PropertySchema], required: true },
  isPublished: { type: Boolean, required: true },
});

export default mongoose.model("Tileset", TilesetSchema);
