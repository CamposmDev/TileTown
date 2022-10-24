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
describe("ExpressTilemapController", function () {
    /** Start the server on port 3000 */
    const server = app.listen("3002");

    before(async function () {
        const connect: string =
            process.env.MONGO_URI ||
            "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority";
        await db.connect(connect);
    });

    /**
     * Method: POST
     * Route: api/forum
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

    after(async function () {
        /** Close the connection to the server */
        server.close();
        await db.disconnect();
    });
});
