import { TilesetEditStore } from "src/context/tilesetEditor/TilesetEditStore";
import { Tileset } from "src/context/tilesetEditor/TilesetEditTypes";
import { tsTPS, tsTPS_Transaction } from "../tsTPS";
/**
 * EditTilesetProperty_Transaction
 * 
 * This class represents a transaction that works with
 * editing the tilesets properties
    
    @author McKilla Gorilla
 */
export default class EditTilesetProperty_Transaction extends tsTPS_Transaction {
  private edit: TilesetEditStore;
  private oldTileset: Tileset;
  private newTileset: Tileset;
  constructor(
    initStore: TilesetEditStore,
    initOldTileset: Tileset,
    initNewTileset: Tileset
  ) {
    super();
    this.edit = initStore;
    this.oldTileset = initOldTileset;
    this.newTileset = initNewTileset;
  }

  doTransaction() {
    this.edit.updateTileset(this.newTileset);
  }

  undoTransaction() {
    this.edit.updateTileset(this.oldTileset);
  }
}
