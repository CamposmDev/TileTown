import { TilesetEditStore } from "src/context/tilesetEditor/TilesetEditStore";
import { tsTPS, tsTPS_Transaction } from "../tsTPS";
/**
 * EditTilesetImage_Transaction
 * 
 * This class represents a transaction that works with
 * editing the tileset canvas
    
    @author McKilla Gorilla
 */
export default class EditTilesetImage_Transaction extends tsTPS_Transaction {
  private edit: TilesetEditStore;
  private oldImage: { image: Blob; imageData: string };
  private newImage: { image: Blob; imageData: string };
  constructor(
    initStore: TilesetEditStore,
    initOldImage: { image: Blob; imageData: string },
    initNewImage: { image: Blob; imageData: string }
  ) {
    super();
    this.edit = initStore;
    this.oldImage = initOldImage;
    this.newImage = initNewImage;
  }

  doTransaction() {
    this.edit.saveImage(this.newImage.imageData, this.newImage.image);
  }

  undoTransaction() {
    this.edit.saveImage(this.oldImage.imageData, this.oldImage.image);
  }
}
