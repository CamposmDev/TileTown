import { expect } from "chai";
import mongoose from "mongoose";
import mocha from "mocha";
import UserSchema from "../../database/mongoose/schemas/user";
import dotenv from "dotenv";
import UserSchemaType from "../../database/mongoose/types/UserSchemaType";
import MongooseTilemapDBM from "../../database/mongoose/managers/MongooseTilemapDBM";
import { TilemapSchema } from "../../database/mongoose/schemas";
import { Layer, Tilemap } from "../../types";

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
                type: "bool",
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
            type: "bool",
            value: "true",
          },
        ],
        renderOrder: "right-down",
      };

      const response = await tilemaps.createTilemap(id, newTilemap);
      console.log(<Tilemap>response);
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

    // it("Successfully finds a user with the id", async function () {
    //   let users: MongooseUserDBM = new MongooseUserDBM();

    //   let schema = await UserSchema.findOne({
    //     email: "peter.t.walsh@stonybrook.edu",
    //   });
    //   let id: string = schema !== null ? schema._id.toString() : "";

    //   let user: User | null = await users.getUserById(id);
    //   expect(user).not.null;
    //   expect(user).property("firstName", "Peter");
    //   expect(user).property("lastName", "Walsh");
    // });

    // it("Fails to find a user - user with id doesn't exist", async function () {
    //   let users: MongooseUserDBM = new MongooseUserDBM();

    //   let schema = await UserSchema.findOne({
    //     email: "peter.t.walsh@stonybrook.edu",
    //   });
    //   let id: string = schema !== null ? schema._id.toString() : "";

    //   let user: User | null = await users.getUserById(id + "123");
    //   expect(user).null;
    // });
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
