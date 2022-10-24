import { Color } from "./Color";
import { Type } from "./Type";

export default interface Property {
  /**
   * A type that defines a TileSetProperties object on our server.
   * @author Andrew Ojeda
   */

  /** Name of property */
  name: string;

  /** Name of type*/
  type: Type;

  /** Value of property */
  value: string;
}
