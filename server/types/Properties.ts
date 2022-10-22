export default interface Properties {
  /**
   * A type that defines a TileSetProperties object on our server.
   * @author Andrew Ojeda
   */

  /** Name of property */
  name: string;

  /** Name of type*/
  type: Type;

  /** Value of property */
  value: string | number | boolean | Color | object;
}
