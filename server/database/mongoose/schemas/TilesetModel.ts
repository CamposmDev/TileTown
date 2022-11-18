import mongoose from "mongoose";
import TilesetSchemaType from "../types/TilesetSchemaType";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * Data model for storing Tileset data
 * @author Andrew Ojeda
 * @
 */

const TilesetSchema = new Schema<TilesetSchemaType>({
  columns: { type: Number, required: true, default: 12 },
  rows: { type: Number, required: true, default: 12 },
  tileHeight: { type: Number, required: true, default: 12 },
  tileWidth: { type: Number, required: true, default: 12 },
  image: { type: String, required: true, default: "~" },
  imageHeight: { type: Number, required: true, default: 144},
  imageWidth: { type: Number, required: true, default: 144 },
  margin: { type: Number, required: true, default: 0 },
  name: { type: String, required: true },
  owner: { type: ObjectId, required: true },
  properties: {
    type: [
      {
        name: { type: String, required: true, default: "property" },
        ptype: { type: String, required: true, default: "string" },
        value: { type: String, required: true, default: "value" },
      },
    ],
    required: false,
    default: []
  },
  isPublished: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: new Date(Date.now())},
  updatedAt: { type: Date, required: true, default: new Date(Date.now())}
});

const TilesetModel = mongoose.model("Tileset", TilesetSchema);

export { TilesetModel };
