import mongoose from "mongoose";
const Schema = mongoose.Schema;
const PropertiesSchema = require("./properties");

/**
 * Data model for storing Tileset data
 * @author Andrew Ojeda
 * @
 */

const TilesetSchema = new Schema({
  columns: { type: Number, required: true },
  firstgid: { type: Number, required: true },
  image: { type: String, required: true },
  imageHeight: { type: Number, required: true },
  imageWidth: { type: Number, required: true },
  margin: { type: Number, required: true },
  name: { type: String, required: true },
  owner: { type: String, required: true },
  properties: { type: PropertiesSchema, required: true },
  isPublished: { type: Boolean, required: true },
});

exports = mongoose.model("Tileset", TilesetSchema);
