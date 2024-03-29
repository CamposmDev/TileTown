import mongoose from "mongoose";
import { TilemapSocialSchemaType } from "../types/index";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/**
 * @author Tuyen Vo
 */

const TileMapSocialSchema = new Schema<TilemapSocialSchemaType>({
  tileMap: { type: ObjectId, require: true },
  name: { type: String, require: true },
  owner: { type: ObjectId, require: true },
  ownerName: { type: String, require: true },
  collaborators: { type: [ObjectId], require: true },
  collaboratorNames: { type: [String], require: true },
  tags: { type: [String], require: true },
  description: { type: String, require: true },
  community: { type: String, require: true },
  contest: { type: String, require: true },
  likes: { type: [ObjectId], require: true },
  dislikes: { type: [ObjectId], require: true },
  views: { type: Number, require: true },
  permissions: [
    {
      type: { type: String, require: true },
      setting: { type: String, require: true },
    },
  ],
  comments: { type: [ObjectId], require: true },
  publishDate: { type: Date, require: true },
  imageURL: { type: String, require: true },
});

const TilemapSocialModel = mongoose.model("TileMapSocialSchema", TileMapSocialSchema);

export { TilemapSocialModel }
