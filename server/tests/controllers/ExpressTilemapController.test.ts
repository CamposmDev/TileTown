import mocha from "mocha";
import request from "supertest";
import { app } from "../../express";
import { db } from "../../database";
import { expect } from "chai";
import { UserSchema } from "../../database/mongoose/schemas";
import { TilemapSchema } from "../../database/mongoose/schemas";
import { Auth } from "../../express/middleware";
import { Tilemap } from "../../types";

/**
 * Tests for the TilemapRouter and associated handlers
 * @author Andrew Ojeda
 */
describe("ExpressUserController", function () {
  /** Start the server on port 3000 */
  const server = app.listen("3000");

  before(async function () {
    const connect: string =
      process.env.MONGO_URI ||
      "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority";
    await db.connect(connect);
  });

  /**
   * Method: POST
   * Route: api/tilemap
   */
  describe("createTilemap", function () {
    beforeEach(async function () {
      await UserSchema.deleteMany();
      await TilemapSchema.deleteMany();
      await db.users.createUser({
        firstName: "Peter",
        lastName: "Walsh",
        email: "peteylumpkins@gmail.com",
        username: "peteylumpkins",
        password: "blackstarthedog",
      });
    });

    it("Successfully created new tilemap", async function () {
      let user = await UserSchema.findOne({
        email: "peteylumpkins@gmail.com",
      });
      let id: string = user !== null ? user._id.toString() : "";
      let token = Auth.signJWT<string>(id);
      let res = await request(app)
        .post("/api/tilemap/")
        .send({
          userId: id,
          tilemap: {
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
      expect(res.status).equals(201);
    });
  });
  /**
   * Method: GET
   * Route: api/tilemap/id
   */
  describe("getTilemapById", function () {
    beforeEach(async function () {
      await UserSchema.deleteMany();
      await TilemapSchema.deleteMany();
      await db.users.createUser({
        firstName: "Peter",
        lastName: "Walsh",
        email: "peteylumpkins@gmail.com",
        username: "peteylumpkins",
        password: "blackstarthedog",
      });
    });

    it("Successfully get tilemap by Id", async function () {
      let user = await UserSchema.findOne({
        email: "peteylumpkins@gmail.com",
      });
      let id: string = user !== null ? user._id.toString() : "";
      let token = Auth.signJWT<string>(id);
      const newTilemap: Partial<Tilemap> = {
        name: "test name",
      };

      const tilemap = await db.tilemaps.createTilemap(id, newTilemap);
      const mapId = (<Tilemap>tilemap).id;
      let response = await request(app)
        .get(`/api/tilemap/${mapId}`)
        .set("Cookie", [`token=${token}`]);
      expect(response.status).equals(200);
    });
  });

  /**
   * Method: Post
   * Route: api/tilemap/id
   */
  describe("updateTilemapById", function () {
    beforeEach(async function () {
      await UserSchema.deleteMany();
      await TilemapSchema.deleteMany();
      await db.users.createUser({
        firstName: "Peter",
        lastName: "Walsh",
        email: "peteylumpkins@gmail.com",
        username: "peteylumpkins",
        password: "blackstarthedog",
      });
    });

    it("Successfully update tilemap by Id", async function () {
      let user = await UserSchema.findOne({
        email: "peteylumpkins@gmail.com",
      });
      let id: string = user !== null ? user._id.toString() : "";
      let token = Auth.signJWT<string>(id);
      const newTilemap: Partial<Tilemap> = {
        name: "test name",
      };

      const tilemap = await db.tilemaps.createTilemap(id, newTilemap);
      const mapId = (<Tilemap>tilemap).id;
      let response = await request(app)
        .put(`/api/tilemap/${mapId}`)
        .send({
          tilemap: {
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
   * Route: api/tilemap/id
   */
  describe("deleteTilemapById", function () {
    beforeEach(async function () {
      await UserSchema.deleteMany();
      await TilemapSchema.deleteMany();
      await db.users.createUser({
        firstName: "Peter",
        lastName: "Walsh",
        email: "peteylumpkins@gmail.com",
        username: "peteylumpkins",
        password: "blackstarthedog",
      });
    });

    it("Successfully update tilemap by Id", async function () {
      let user = await UserSchema.findOne({
        email: "peteylumpkins@gmail.com",
      });
      let id: string = user !== null ? user._id.toString() : "";
      let token = Auth.signJWT<string>(id);
      const newTilemap: Partial<Tilemap> = {
        name: "test name",
      };

      const tilemap = await db.tilemaps.createTilemap(id, newTilemap);
      const mapId = (<Tilemap>tilemap).id;
      let response = await request(app)
        .delete(`/api/tilemap/${mapId}`)
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
