import {
  Tilemap,
  CollaboratorSettings,
  TilemapSocialStatistics,
  SocialStatisticsPermissions,
  Layer,
  Property,
} from "../../../types";
import Comment from "../../../types/Comment";

/**
 * An interface defining a set of methods to work with TileTown Tilemaps and Tilemap social statistics in an arbitrary DBMS.
 * @author Peter Walsh, Andrew Ojeda
 */

export default interface TilemapDBM {
  /**
   * Gets the data associated with a Tilemap with the given id in a DBMS.
   *
   * @remarks
   *
   * If the method is successful, the method returns a new Tilemap object with all of the information associated
   * with the user in the DBMS. If the tilemap with the given id does not exist in the DBMS or the method fails
   * for any reason, it returns null.
   *
   * @param tilemapId the id of the tilemap to get
   * @return a Tilemap object with all information about the Tilemap or null
   */
  getTilemapById(tilemapId: string): Promise<Tilemap | string>;

  /**
   * Gets the partial data associated with Tilemaps that a specific user either owns or can edit.
   *
   * @remarks
   *
   * If the method is successful, the method returns a new Tilemap object with all of the information associated
   * with the user in the DBMS. If the tilemap with the given id does not exist in the DBMS or the method fails
   * for any reason, it returns null.
   *
   * @param tilemapId the id of the tilemap to get
   * @param search search string that refers to tile map name
   * @param sortBy string to sort the returned data
   * @return array of tilemap partials
   */
  getTilemapPartials(
    userId: string,
    search: string,
    sortBy: string
  ): Promise<Partial<Tilemap>[] | string>;

  /**
   * Creates a new Tilemap in the DBMS from the Partial Tilemap
   *
   * @remarks
   *
   * If the method is successful, the method returns a new Tilemap object with all of the information associated
   * with the user in the DBMS. If the tilemap could not be created it returns a null
   *
   * @param userId Id of user that's creating the tilemap
   * @param tilemap partial of Tilemap being created
   * @return a Tilemap object with all information about the Tilemap or null
   */
  createTilemap(
    userId: string,
    tilemap: Partial<Tilemap>
  ): Promise<Tilemap | string>;

  /**
   * Updates Tilemap in the DBMS from the Partial Tilemap
   *
   * @remarks
   *
   * If the method is successful, the method returns a new Tilemap object with all of the information associated
   * with the user in the DBMS. If the tilemap could not be created it returns a null
   *
   * @param tilemapID the id of the tilemap to update
   * @param tilemap partial of tilemap data to update
   * @return a Tilemap object with all information about the Tilemap or null
   */
  updateTilemapById(
    tilemapId: string,
    tilemap: Partial<Tilemap>
  ): Promise<Tilemap | string>;

  /**
   * Deletes a Tilemap in the DBMS from it's id
   *
   * @remarks
   *
   * If the method is successful, the method returns message confirming tilemap has been
   * deleted, null if unsuccessful
   *
   * @param tilemapId id of tilemap to be deleted
   * @return a message notifying if tilemap was deleted
   */
  deleteTilemapById(tilemapId: string): Promise<Partial<Tilemap> | string>;

  // /**
  //  * Adds a new layer to a specific tilemap
  //  *
  //  * @remarks
  //  *
  //  * If the method is successful, the method returns a new Tilemap object with all of the information associated
  //  * with the user in the DBMS. If the tilemap could not be created it returns a null
  //  *
  //  * @param tilemapId id of tilemap having a layer added to it
  //  * @param layer partial of layer being added
  //  * @return updated array of Layers
  //  */
  // addLayer(tilemapId: string, layer: Partial<Layer>): Promise<[Layer] | string>;

  // /**
  //  * Updates a specific layer to a specific tilemap
  //  *
  //  * @remarks
  //  *
  //  * If the method is successful, the method returns a new Tilemap object with all of the information associated
  //  * with the user in the DBMS. If the tilemap could not be created it returns a null
  //  *
  //  * @param tilemapId id of tilemap having a layer updated
  //  * @param layer partial of layer being updated
  //  * @param index index of layer in layer array to be updated
  //  * @return updated array of Layers
  //  */
  // updateLayer(
  //   tilemapId: string,
  //   layer: Partial<Layer>,
  //   index: number
  // ): Promise<[Layer] | string>;

  // /**
  //  * Deletes a specific layer to a specific tilemap
  //  *
  //  * @remarks
  //  *
  //  * If the method is successful, the method returns a new Tilemap object with all of the information associated
  //  * with the user in the DBMS. If the tilemap could not be created it returns a null
  //  *
  //  * @param tilemapId id of tilemap having a layer deleted
  //  * @param index index of layer in layer array to be deleted
  //  * @return updated array of Layers
  //  */
  // removeLayer(tilemapId: string, index: number): Promise<[Layer] | string>;

  // /**
  //  * Swaps two layers in a specific tilemap
  //  *
  //  * @remarks
  //  *
  //  * If the method is successful, the method returns a new Tilemap object with all of the information associated
  //  * with the user in the DBMS. If the tilemap could not be created it returns a null
  //  *
  //  * @param tilemapId id of tilemap having a layer deleted
  //  * @param firstIndex index of layer to be moved to secondIndex
  //  * @param secondIndex index of layer to be moved to firstIndex
  //  * @return updated array of Layers
  //  */
  // moveLayers(
  //   tilemapId: string,
  //   firstIndex: number,
  //   secondIndex: number
  // ): Promise<[Layer] | string>;

  // /**
  //  * Adds a new collaborator to a specific tilemap
  //  *
  //  * @remarks
  //  *
  //  * If the method is successful, the method returns a new Tilemap object with all of the information associated
  //  * with the user in the DBMS. If the tilemap could not be created it returns a null
  //  *
  //  * @param tilemapId id of tilemap having a collaborator added to it
  //  * @param collaboratorId id of user who is being added as a collaborator
  //  * @return object containing arrays of the ids and names of collaborators
  //  */
  // addCollaborator(
  //   tilemapId: string,
  //   collaboratorId: string
  // ): Promise<{ collaboratorIds: [string]; collaboratorNames: [string] } | string>;

  // /**
  //  * Removes a collaborator to a specific tilemap
  //  *
  //  * @remarks
  //  *
  //  * If the method is successful, the method returns a new Tilemap object with all of the information associated
  //  * with the user in the DBMS. If the tilemap could not be created it returns a null
  //  *
  //  * @param tilemapId id of tilemap having a collaborator added to it
  //  * @param collaboratorId id of user who is being removed as a collaborator
  //  * @return object containing arrays of the ids and names of collaborators
  //  */
  // removeCollaborator(
  //   tilemapId: string,
  //   collaboratorsId: string
  // ): Promise<{ collaboratorIds: [string]; collaboratorNames: [string] } | string>;

  // /**
  //  * Updates Collaborator settings to a specific tilemap
  //  *
  //  * @remarks
  //  *
  //  * If the method is successful, the method returns a new Tilemap object with all of the information associated
  //  * with the user in the DBMS. If the tilemap could not be created it returns a null
  //  *
  //  * @param tilemapId id of tilemap having its collaborator settings updated
  //  * @param collaboratorSettings new collaborator settings to update
  //  * @return a CollaboratorSettings object with all information about the CollaboratorSettings or null
  //  */
  // updateCollaboratorSettings(
  //   tilemapId: string,
  //   collaboratorSettings: CollaboratorSettings
  // ): Promise<CollaboratorSettings | string>;

  // /**
  //  * Updates Collaborator index to a specific tilemap, -1 means anyone can edit it
  //  *
  //  * @remarks
  //  *
  //  * If the method is successful, the method returns a new Tilemap object with all of the information associated
  //  * with the user in the DBMS. If the tilemap could not be created it returns a null
  //  *
  //  * @param tilemapId id of tilemap having its collaborator settings updated
  //  * @param collaboratorIndex index of which
  //  * @return updated index
  //  */
  // updateCollaboratorIndex(
  //   tilemapId: string,
  //   collaboratorIndex: number
  // ): Promise<number | string>;

  // /**
  //  * Adds a new property to a specific tilemap
  //  *
  //  * @remarks
  //  *
  //  * If the method is successful, the method returns a new Tilemap object with all of the information associated
  //  * with the user in the DBMS. If the tilemap could not be created it returns a null
  //  *
  //  * @param tilemapId id of tilemap having a property added to it
  //  * @param property that is being added
  //  * @return object containing array of properties
  //  */
  // addProperty(
  //   tilemapId: string,
  //   property: Property
  // ): Promise<[Property] | string>;

  // /**
  //  * Removes a property from a specific tilemap
  //  *
  //  * @remarks
  //  *
  //  * If the method is successful, the method returns a new Tilemap object with all of the information associated
  //  * with the user in the DBMS. If the tilemap could not be created it returns a null
  //  *
  //  * @param tilemapId id of tilemap having a property removed
  //  * @param property that is being added
  //  * @return object containing array of properties
  //  */
  // removeProperty(tilemapId: string, index: number): Promise<[Property] | string>;

  // /**
  //  * Updates property to a specific tilemap
  //  *
  //  * @remarks
  //  *
  //  * If the method is successful, the method returns a new Tilemap object with all of the information associated
  //  * with the user in the DBMS. If the tilemap could not be created it returns a null
  //  *
  //  * @param tilemapId id of tilemap having its property updated
  //  * @param property that is being updated
  //  * @param index index of property in array
  //  * @return object containing array of properties
  //  */
  // updateProperty(
  //   tilemapId: string,
  //   property: Property,
  //   index: number
  // ): Promise<[Property] | string>;

  // /**
  //  * Adds a new tileset to a specific tilemap
  //  *
  //  * @remarks
  //  *
  //  * If the method is successful, the method returns a new Tilemap object with all of the information associated
  //  * with the user in the DBMS. If the tilemap could not be created it returns a null
  //  *
  //  * @param tilemapId id of tilemap having a tileset added to it
  //  * @param tilesetId id of tileset being added
  //  * @return updated array of tileset ids
  //  */
  // addTileset(tilemapId: string, tilesetId: string): Promise<[string] | string>;

  // /**
  //  * Adds a new tileset to a specific tilemap
  //  *
  //  * @remarks
  //  *
  //  * If the method is successful, the method returns a new Tilemap object with all of the information associated
  //  * with the user in the DBMS. If the tilemap could not be created it returns a null
  //  *
  //  * @param tilemapId id of tilemap having a tileset added to it
  //  * @param index index of tileset being removed
  //  * @return updated array of tileset ids
  //  */
  // removeTileset(tilemapId: string, index: number): Promise<[string] | string>;

  addTilemapComment(payload: Comment): Promise<TilemapSocialStatistics | null>;

  toggleLike(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | null>;

  toggleDislike(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | null>;

  addView(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | null>;

  updateTilemapPermissions(
    socialId: string,
    permissions: SocialStatisticsPermissions
  ): Promise<TilemapSocialStatistics | null>;
}
