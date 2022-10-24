import { expect } from "chai";
import mongoose from "mongoose";
import mocha from "mocha";
import UserSchema from "../../database/mongoose/schemas/User";
import dotenv from "dotenv";
import MongooseTilemapDBM from "../../database/mongoose/managers/MongooseTilemapDBM";
import { TilemapSchema } from "../../database/mongoose/schemas";
import { Layer, SortBy, Tilemap } from "../../types";

/** Config the env variables */
dotenv.config();

/**
 * A mocha testing suite for the MongooseTilemapDBM. I have linked the official documentation below.
 * {@link https://mochajs.org/}
 */
describe("Testing MongooseUserDBM", function () {
  /** The connection string to connect to mongoose */
  const connect: string =
    process.env.MONGO_URI ||
    "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority";

  /**
   * The before method gets called before any of the nested testing suites or tests
   * gets run. Before I do anything, I need to connect to the database.
   * {@link https://mochajs.org/#hooks}
   */
  before(async function () {
    await mongoose.connect(connect);
  });

  describe("createTilemap", function () {
    beforeEach(async function () {
      await UserSchema.deleteMany();
      await UserSchema.create({
        firstName: "Peter",
        lastName: "Walsh",
        email: "peter.t.walsh@stonybrook.edu",
        username: "PeteyLumpkins",
        password: "DummyPassword",
        verifyKey: "something?!",
        isVerified: false,
        favoriteTileMaps: [],
        favoriteTileSets: [],
        joinedContests: [],
        joinedCommunities: [],
        friends: [],
        imageURL: " ",
      });
      await TilemapSchema.deleteMany();
    });

    it("Successfully creates a new tilemap with complete tilemap data", async function name() {
      const tilemaps: MongooseTilemapDBM = new MongooseTilemapDBM();

      let schema = await UserSchema.findOne({
        email: "peter.t.walsh@stonybrook.edu",
      });
      let id: string = schema !== null ? schema._id.toString() : "";

      const newTilemap: Partial<Tilemap> = {
        backgroundColor: "#000000",
        image: "testURL",
        height: 20,
        width: 36,
        layers: [
          {
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            height: 20,
            width: 30,
            name: "test layer",
            opacity: 0.8,
            properties: [
              {
                name: "test type",
                ptype: "bool",
                value: "true",
              },
            ],
            visible: true,
            x: 0,
            y: 0,
          },
        ],
        tileHeight: 24,
        tileWidth: 24,
        nextLayerId: 1,
        nextObjectId: 0,
        orientation: "orthogonal",
        name: "test name",
        tilesets: ["507f1f77bcf86cd799439011"],
        globalTileIDs: [45],
        properties: [
          {
            name: "test type",
            ptype: "bool",
            value: "true",
          },
        ],
        renderOrder: "right-down",
      };

      const response = await tilemaps.createTilemap(id, newTilemap);

      expect(response).not.null;
      expect(response).not.string;
      expect(response).property("backgroundColor", newTilemap.backgroundColor);
      expect(response).to.have.property("collaborators").that.deep.equals([]);
      expect(response)
        .to.have.property("collaboratorNames")
        .that.deep.equals([]);
      expect(response)
        .to.have.property("collaboratorSettings")
        .that.deep.equals({
          editMode: "free",
          timeLimit: 0,
          tileLimit: 0,
        });
      expect(response).property("collaboratorIndex", -1);
      expect(response).property("image", "testURL");
      expect(response).property("height", newTilemap.height);
      expect(response).property("width", newTilemap.width);
      // expect(response).property("layers", <[Layer]>newTilemap.layers);
      expect(response).property("tileHeight", newTilemap.tileHeight);
      expect(response).property("tileWidth", newTilemap.tileWidth);
      expect(response).property("nextLayerId", newTilemap.nextLayerId);
      expect(response).property("nextObjectId", newTilemap.nextObjectId);
      expect(response).property("orientation", newTilemap.orientation);
      expect(response).property("name", newTilemap.name);
      expect(response).property("owner", id);
      expect(response)
        .to.have.property("globalTileIDs")
        .that.deep.equals(newTilemap.globalTileIDs);
      expect(response)
        .to.have.property("tilesets")
        .that.deep.equals(newTilemap.tilesets);
      // expect(response).property("properties", newTilemap.properties);
      expect(response).property("renderOrder", newTilemap.renderOrder);
      expect(response).property("isPublished", false);
    });

    it("Successfully creates a new tilemap with incomplete tilemap data", async function name() {
      const tilemaps: MongooseTilemapDBM = new MongooseTilemapDBM();
      await TilemapSchema.deleteMany();

      let schema = await UserSchema.findOne({
        email: "peter.t.walsh@stonybrook.edu",
      });
      let id: string = schema !== null ? schema._id.toString() : "";

      const newTilemap: Partial<Tilemap> = {
        name: "test name 2",
      };

      const response = await tilemaps.createTilemap(id, newTilemap);

      expect(response).not.null;
      expect(response).not.string;
      expect(response).property("backgroundColor", "#FFFFFF");
      expect(response).to.have.property("collaborators").that.deep.equals([]);
      expect(response)
        .to.have.property("collaboratorNames")
        .that.deep.equals([]);
      expect(response)
        .to.have.property("collaboratorSettings")
        .that.deep.equals({
          editMode: "free",
          timeLimit: 0,
          tileLimit: 0,
        });
      expect(response).property("collaboratorIndex", -1);
      expect(response).property("image", "noImage");
      expect(response).property("height", 12);
      expect(response).property("width", 12);
      // expect(response).property("layers", <[Layer]>newTilemap.layers);
      expect(response).property("tileHeight", -1);
      expect(response).property("tileWidth", -1);
      expect(response).property("nextLayerId", 0);
      expect(response).property("nextObjectId", 0);
      expect(response).property("orientation", "orthogonal");
      expect(response).property("name", newTilemap.name);
      expect(response).property("owner", id);
      expect(response).to.have.property("globalTileIDs").that.deep.equals([1]);
      expect(response).to.have.property("tilesets").that.deep.equals([]);
      // expect(response).property("properties", newTilemap.properties);
      expect(response).property("renderOrder", "right-down");
      expect(response).property("isPublished", false);
    });
    it("Unsuccessfully creates a new tilemap with a name that already exists", async function name() {
      const tilemaps: MongooseTilemapDBM = new MongooseTilemapDBM();
      await TilemapSchema.deleteMany();

      let schema = await UserSchema.findOne({
        email: "peter.t.walsh@stonybrook.edu",
      });
      let id: string = schema !== null ? schema._id.toString() : "";

      const newTilemap: Partial<Tilemap> = {
        name: "test name",
      };

      await tilemaps.createTilemap(id, newTilemap);

      const res = await TilemapSchema.findOne({ name: newTilemap.name });

      const newTilemap2: Partial<Tilemap> = {
        name: "test name",
      };

      const response = await tilemaps.createTilemap(id, newTilemap2);

      expect(response).not.null;
      expect(response).string;
    });

    it("Unsuccessfully creates a new tilemap with an incorrect but properly formatted userId", async function name() {
      const tilemaps: MongooseTilemapDBM = new MongooseTilemapDBM();
      await TilemapSchema.deleteMany();

      let schema = await UserSchema.findOne({
        email: "peter.t.walsh@stonybrook.edu",
      });
      let id: string = "6356165924f889ac76eb40ec";

      const newTilemap: Partial<Tilemap> = {
        name: "test name",
      };

      const response = await tilemaps.createTilemap(id, newTilemap);

      expect(response).not.null;
      expect(response).string;
    });
  });
  describe("updateTilemapById", function () {
    beforeEach(async function () {
      await UserSchema.deleteMany();
      await UserSchema.create({
        firstName: "Peter",
        lastName: "Walsh",
        email: "peter.t.walsh@stonybrook.edu",
        username: "PeteyLumpkins",
        password: "DummyPassword",
        verifyKey: "something?!",
        isVerified: false,
        favoriteTileMaps: [],
        favoriteTileSets: [],
        joinedContests: [],
        joinedCommunities: [],
        friends: [],
        imageURL: " ",
      });
      await TilemapSchema.deleteMany();
    });

    it("Update Tilemap successfully with complete information", async function name() {
      const tilemaps: MongooseTilemapDBM = new MongooseTilemapDBM();
      await TilemapSchema.deleteMany();

      let schema = await UserSchema.findOne({
        email: "peter.t.walsh@stonybrook.edu",
      });
      let id: string = "6356165924f889ac76eb40ec";

      const newTilemap: Partial<Tilemap> = {
        name: "test map",
      };

      const res = await tilemaps.createTilemap(id, newTilemap);

      const mapId = (<Tilemap>res).id;

      const updateTilemap: Partial<Tilemap> = {
        backgroundColor: "#000000",
        collaborators: ["507f191e810c19729de860ea"],
        collaboratorNames: ["Camposm"],
        collaboratorSettings: {
          editMode: "queue",
          timeLimit: 500,
          tileLimit: 10,
        },
        image: "testURL2",
        height: 20,
        width: 36,
        layers: [
          {
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            height: 20,
            width: 30,
            name: "test layer",
            opacity: 0.8,
            properties: [
              {
                name: "test type",
                ptype: "bool",
                value: "true",
              },
            ],
            visible: true,
            x: 0,
            y: 0,
          },
        ],
        tileHeight: 24,
        tileWidth: 24,
        nextLayerId: 1,
        nextObjectId: 0,
        orientation: "orthogonal",
        name: "update name",
        tilesets: ["507f1f77bcf86cd799439011"],
        globalTileIDs: [45],
        properties: [
          {
            name: "test type",
            ptype: "bool",
            value: "true",
          },
        ],
        renderOrder: "right-up",
      };

      const response = await tilemaps.updateTilemapById(mapId, updateTilemap);

      expect(response).not.null;
      expect(response).not.string;
    });
  });

  describe("getTilemapPartials", function () {
    beforeEach(async function () {
      await UserSchema.deleteMany();
      await UserSchema.create({
        firstName: "Peter",
        lastName: "Walsh",
        email: "peter.t.walsh@stonybrook.edu",
        username: "PeteyLumpkins",
        password: "DummyPassword",
        verifyKey: "something?!",
        isVerified: false,
        favoriteTileMaps: [],
        favoriteTileSets: [],
        joinedContests: [],
        joinedCommunities: [],
        friends: [],
        imageURL: " ",
      });
      await TilemapSchema.deleteMany();
    });
    it("Get tilemapPartials successfully", async function name() {
      const tilemaps: MongooseTilemapDBM = new MongooseTilemapDBM();

      let schema = await UserSchema.findOne({
        email: "peter.t.walsh@stonybrook.edu",
      });
      let id: string = schema !== null ? schema._id.toString() : "";

      let userName: string = schema !== null ? schema.username : "";

      const newTilemap: Partial<Tilemap> = {
        name: "test name",
      };
      const newTilemap2: Partial<Tilemap> = {
        name: "test name 2",
      };
      const newTilemap3: Partial<Tilemap> = {
        name: "test name 3",
      };

      const res = await tilemaps.createTilemap(id, newTilemap);
      const mapId = (<Tilemap>res).id;
      const res2 = await tilemaps.createTilemap(id, newTilemap2);
      const mapId2 = (<Tilemap>res2).id;
      const res3 = await tilemaps.createTilemap(id, newTilemap3);
      const mapId3 = (<Tilemap>res3).id;

      const updateTilemap: Partial<Tilemap> = {
        collaboratorNames: [userName],
      };

      await tilemaps.updateTilemapById(mapId, updateTilemap);
      await tilemaps.updateTilemapById(mapId2, updateTilemap);
      await tilemaps.updateTilemapById(mapId3, updateTilemap);

      const response = await tilemaps.getTilemapPartials(
        userName,
        "test name",
        SortBy.Newest
      );
      console.log(response);
      expect(response).not.null;
      expect(response).not.string;
    });
  });

  describe("getTilemapById", function () {
    beforeEach(async function () {
      await UserSchema.deleteMany();
      await UserSchema.create({
        firstName: "Peter",
        lastName: "Walsh",
        email: "peter.t.walsh@stonybrook.edu",
        username: "PeteyLumpkins",
        password: "DummyPassword",
        verifyKey: "something?!",
        isVerified: false,
        favoriteTileMaps: [],
        favoriteTileSets: [],
        joinedContests: [],
        joinedCommunities: [],
        friends: [],
        imageURL: " ",
      });
      await TilemapSchema.deleteMany();
    });

    it("get tilemap with mapId successfully", async function name() {
      const tilemaps = new MongooseTilemapDBM();
      const newTilemap: Partial<Tilemap> = {
        name: "test map",
      };
      let schema = await UserSchema.findOne({
        email: "peter.t.walsh@stonybrook.edu",
      });
      const id: string = schema !== null ? schema._id.toString() : "";
      const mapSchema = await tilemaps.createTilemap(id, newTilemap);
      const mapId: string =
        schema !== null ? (<Tilemap>mapSchema).id.toString() : "";
      const response = await tilemaps.getTilemapById(mapId);
      console.log(response);
      expect(response).not.null;
      expect(response).not.string;
    });
  });

  /**
   * The before method gets called after all of the tests have run. I am using it here
   * to close the connection to MongoDB.
   * {@link https://mochajs.org/#hooks}
   */
  after(async function () {
    await mongoose.connection.close();
  });
});
