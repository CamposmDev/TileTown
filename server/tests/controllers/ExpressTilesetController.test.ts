import mocha from "mocha";
import request from "supertest";
import { app } from "../../express";
import { db } from "../../database";
import { expect } from "chai";
import { UserModel } from "../../database/mongoose/schemas";
import { TilesetModel } from "../../database/mongoose/schemas";
import { Auth } from "../../express/middleware";
import { Tileset } from "../../types";
import { TilesetSchemaType } from "../../database/mongoose/types";
import mongoose from "mongoose";

/**
 * Tests for the TilesetRouter and associated handlers
 * @author Andrew Ojeda
 */
describe("ExpressTilesetController", function () {
  const tileset1: Partial<Tileset> = {
    columns: 4,
    lastSaveDate: new Date(Date.now()),
    image: "imageurl",
    imageHeight: 32,
    imageWidth: 32,
    margin: 4,
    name: "tileset1",
    properties: [],
    isPublished: false,
  };

  const tileset2: TilesetSchemaType = {
    owner: new mongoose.Types.ObjectId(),
    columns: 4,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    image: "imageurl",
    imageHeight: 32,
    imageWidth: 32,
    margin: 4,
    name: "tileset2",
    properties: [],
    isPublished: false,
  };

  const tileset3: TilesetSchemaType = {
    owner: new mongoose.Types.ObjectId(),
    columns: 4,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    image: "imageurl",
    imageHeight: 32,
    imageWidth: 32,
    margin: 4,
    name: "tileset3",
    properties: [],
    isPublished: false,
  };
  /** Start the server on port 3000 */
  const server = app.listen("3004");

  before(async function () {
    const connect: string =
      process.env.MONGO_URI ||
      "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority";
    await db.connect(connect);
  });

  /**
   * Method: POST
   * Route: api/tileset
   */
  describe("createTileset", function () {
    beforeEach(async function () {
      await UserModel.deleteMany();
      await TilesetModel.deleteMany();
      await db.users.createUser({
        firstName: "Peter",
        lastName: "Walsh",
        email: "peteylumpkins@gmail.com",
        username: "peteylumpkins",
        password: "blackstarthedog",
      });
    });

    it("Successfully created new tileset", async function () {
      let user = await UserModel.findOne({
        email: "peteylumpkins@gmail.com",
      });
      let id: string = user !== null ? user._id.toString() : "";
      let token = Auth.signJWT<string>(id);
      let res = await request(app)
        .post("/api/tileset/")
        .send({
          userId: id,
          tileset: tileset1,
        })
        .set("Cookie", [`token=${token}`]);
      expect(res.status).equals(201);
    });
  });
  /**
   * Method: GET
   * Route: api/tileset/id
   */
  describe("getTilesetById", function () {
    beforeEach(async function () {
      await UserModel.deleteMany();
      await TilesetModel.deleteMany();
      await db.users.createUser({
        firstName: "Peter",
        lastName: "Walsh",
        email: "peteylumpkins@gmail.com",
        username: "peteylumpkins",
        password: "blackstarthedog",
      });
    });

    it("Successfully get tileset by Id", async function () {
      let user = await UserModel.findOne({
        email: "peteylumpkins@gmail.com",
      });
      let id: string = user !== null ? user._id.toString() : "";
      let token = Auth.signJWT<string>(id);
      const newTileset: Partial<Tileset> = {
        name: "test name",
      };

      const tileset = await db.tilesets.createTileset(id, newTileset);
      const setId = (<Tileset>tileset).id;
      let response = await request(app)
        .get(`/api/tileset/${setId}`)
        .set("Cookie", [`token=${token}`]);
      expect(response.status).equals(200);
    });
  });

  /**
   * Method: Post
   * Route: api/tileset/id
   */
  describe("updateTilesetById", function () {
    beforeEach(async function () {
      await UserModel.deleteMany();
      await TilesetModel.deleteMany();
      await db.users.createUser({
        firstName: "Peter",
        lastName: "Walsh",
        email: "peteylumpkins@gmail.com",
        username: "peteylumpkins",
        password: "blackstarthedog",
      });
    });

    it("Successfully update tileset by Id", async function () {
      let user = await UserModel.findOne({
        email: "peteylumpkins@gmail.com",
      });
      let id: string = user !== null ? user._id.toString() : "";
      let token = Auth.signJWT<string>(id);
      const newTileset: Partial<Tileset> = {
        name: "test name",
      };

      const tileset = await db.tilesets.createTileset(id, newTileset);
      const setId = (<Tileset>tileset).id;
      let response = await request(app)
        .put(`/api/tileset/${setId}`)
        .send({
          tileset: {
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
          },
        })
        .set("Cookie", [`token=${token}`]);
      console.log(response);
      expect(response.status).equals(201);
    });
  });

  /**
   * Method: Delete
   * Route: api/tileset/id
   */
  describe("deleteTilesetById", function () {
    beforeEach(async function () {
      await UserModel.deleteMany();
      await TilesetModel.deleteMany();
      await db.users.createUser({
        firstName: "Peter",
        lastName: "Walsh",
        email: "peteylumpkins@gmail.com",
        username: "peteylumpkins",
        password: "blackstarthedog",
      });
    });

    it("Successfully update tileset by Id", async function () {
      let user = await UserModel.findOne({
        email: "peteylumpkins@gmail.com",
      });
      let id: string = user !== null ? user._id.toString() : "";
      let token = Auth.signJWT<string>(id);
      const newTileset: Partial<Tileset> = {
        name: "test name",
      };

      const tileset = await db.tilesets.createTileset(id, newTileset);
      const setId = (<Tileset>tileset).id;
      let response = await request(app)
        .delete(`/api/tileset/${setId}`)
        .set("Cookie", [`token=${token}`]);
      console.log(response);
      expect(response.status).equals(201);
    });
  });

  after(async function () {
    /** Close the connection to the server */
    server.close();
    await db.disconnect();
  });
});
