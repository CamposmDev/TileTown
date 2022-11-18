import mongoose from "mongoose";
import { LayerSchemaType, PropertySchemaType } from "../types/index";
import TilemapSchemaType from "../types/TilemapSchemaType";

const LayerSchema = require("./layer").schema;
const PropertySchema = require("./Property").schema;

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * Data model for storing Tilemap data
 * @author Andrew Ojeda
 * @author Peter Walsh
 */
const TilemapSchema = new Schema<TilemapSchemaType>({
  backgroundColor: { type: String, required: true, default: "#FFFFFF" },
  collaborators: { type: [ObjectId], required: true, default: [] },
  collaboratorNames: { type: [String], required: true, default: [] },
  collaboratorSettings: {
    type: {
      editMode: { type: String, required: true, default: "free" },
      timeLimit: { type: Number, required: true, default: 0 },
      tileLimit: { type: Number, required: true, default: 0 },
    },
    required: true, 
    default: { editMode: "free", timeLimit: 0, tileLimit: 0 }
  },
  collaboratorIndex: { type: Number, required: true, default: -1 },
  image: { type: String, required: true, default: "~" },
  height: { type: Number, required: true , default: 12 },
  width: { type: Number, required: true, default: 12 },
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
    default: []
  },
  tileHeight: { type: Number, required: true, default: -1 },
  tileWidth: { type: Number, required: true, default: -1 },
  nextLayerId: { type: Number, required: true, default: 0 },
  nextObjectId: { type: Number, required: true, default: 0 },
  orientation: { type: String, required: true, default: "orthogonal" },
  name: { type: String, required: true },
  owner: { type: String, required: true },
  tilesets: { type: [ObjectId], required: true, default: [] },
  globalTileIDs: { type: [Number], required: true, default: [1] },
  properties: {
    type: [
      {
        name: { type: String, required: true, default: "" },
        ptype: { type: String, required: true, default: "string" },
        value: { type: String, required: true, default: "" },
      },
    ],
    required: false,
    default: []
  },
  renderOrder: { type: String, required: true, default: "right-down" },
  isPublished: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: new Date(Date.now()) },
  updatedAt: { type: Date, required: true, default: new Date(Date.now()) }
});

const TilemapModel = mongoose.model("Tilemap", TilemapSchema);

export { TilemapModel }
