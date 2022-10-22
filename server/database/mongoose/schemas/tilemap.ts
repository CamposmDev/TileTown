import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const PropertiesSchema = require("./properties");
const LayerSchema = require("./layer");
const TilesetSchema = require("./tileset");

/**
 * Data model for storing Tilemap data
 * @author Andrew Ojeda
 * @
 */

const TilemapSchema = new Schema({
  backgroundColor: { type: String, required: true },
  collaborators: { type: [ObjectId], required: true },
  collaboratorNames: { type: [String], required: true },
  collaboratorSettings: {
    type: { editMode: String, timeLimit: Number, tileLimit: Number },
    required: true,
  },
  image: { type: String, required: true },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
  layers: { type: [LayerSchema], required: true },
  tileHeight: { type: Number, required: true },
  tileWidth: { type: Number, required: true },
  nextLayerId: { type: Number, required: true },
  nextObjectId: { type: Number, required: true },
  name: { type: String, required: true },
  owner: { type: String, required: true },
  tilesets: { type: [TilesetSchema], required: true },
  properties: { type: PropertiesSchema, required: true },
  renderOrder: { type: Number, required: true },
  isPublished: { type: Boolean, required: true },
});

export = mongoose.model("Tileset", TilemapSchema);
