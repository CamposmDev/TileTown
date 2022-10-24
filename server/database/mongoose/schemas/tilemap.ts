import mongoose from "mongoose";
import TilemapSchemaType from "../types/TilemapSchemaType";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
<<<<<<< HEAD
const PropertySchema = require("./Property").schema;
=======
const PropertySchema = require("./property").schema;
>>>>>>> peter
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
  orientation: { type: String, required: true },
  name: { type: String, required: true },
  owner: { type: String, required: true },
  tilesets: { type: [ObjectId], required: true },
  globalTileIDs: { type: [Number], required: true },
  properties: { type: [PropertySchema], required: true },
  renderOrder: { type: String, required: true },
  isPublished: { type: Boolean, required: true },
});

export default mongoose.model("Tilemap", TilemapSchema);
