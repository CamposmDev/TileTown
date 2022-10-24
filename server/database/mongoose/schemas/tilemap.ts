import mongoose from "mongoose";
import { LayerSchemaType, PropertySchemaType } from "../types";
import TilemapSchemaType from "../types/TilemapSchemaType";

const LayerSchema = require("./Layer").schema;
const PropertySchema = require("./Property").schema;

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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
    type: {
      editMode: { type: String, required: true },
      timeLimit: { type: Number, required: true },
      tileLimit: { type: Number, required: true },
    },
    required: true,
  },
  collaboratorIndex: { type: Number, required: true },
  image: { type: String, required: true },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
  layers: {
    type: [
      {
        data: { type: [Number], required: true },
        height: { type: Number, required: true },
        width: { type: Number, required: true },
        name: { type: String, required: true },
        opacity: { type: Number, required: true },
        properties: {
          type: [
            {
              name: { type: String, required: true },
              ptype: { type: String, required: true },
              value: { type: String, required: true },
            },
          ],
          required: false,
        },
        visible: { type: Boolean, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
      },
    ],
    required: true,
  },
  tileHeight: { type: Number, required: true },
  tileWidth: { type: Number, required: true },
  nextLayerId: { type: Number, required: true },
  nextObjectId: { type: Number, required: true },
  orientation: { type: String, required: true },
  name: { type: String, required: true },
  owner: { type: String, required: true },
  tilesets: { type: [ObjectId], required: true },
  globalTileIDs: { type: [Number], required: true },
  properties: {
    type: [
      {
        name: { type: String, required: true },
        ptype: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    required: false,
  },
  renderOrder: { type: String, required: true },
  isPublished: { type: Boolean, required: true },
});

export default mongoose.model("Tilemap", TilemapSchema);
