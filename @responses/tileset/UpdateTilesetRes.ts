import { Tileset } from "@types";

export default interface UpdateTilesetRes {
  tileset: Partial<Tileset>;
  message: string;
}
