import mongoose from "mongoose";
import TilemapSchemaType from "../types/TileMapSchemaType";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const PropertySchema = require("./properties").schema;
const LayerSchema = require("./layer").schema;

/**
 * Data model for storing Tilemap data
 * @author Andrew Ojeda
 * @
 */

const TilemapSchema = new Schema<TilemapSchemaType>({
  backgroundColor: { type: String, required: true },
  collaborators: { type: [ObjectId], required: true },
  collaboratorNames: { type: [String], required: true },
  collaboratorSettings: {
    type: { editMode: String, timeLimit: Number, tileLimit: Number },
    required: true,
  },
  collaboratorIndex: { type: Number, required: true },
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
  tilesets: { type: [ObjectId], required: true },
  properties: { type: [PropertySchema], required: true },
  renderOrder: { type: Number, required: true },
  isPublished: { type: Boolean, required: true },
});

export = mongoose.model("Tileset", TilemapSchema);
