import mocha from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';

import { TilesetModel, UserModel } from "../../database/mongoose/schemas";
import { MongooseTilesetDBM } from "../../database/mongoose/managers";
import { Tileset } from '../../types';
import { TilesetSchemaType } from '../../database/mongoose/types';


/** 
 * A mocha testing suite for the MongooseCommunityDBM. I have linked the official documentation below.
 * {@link https://mochajs.org/}
 * @author Peter Walsh
 */
describe("Testing MongooseTilesetDBM", function() {

    /** The connection string to connect to mongoose */
    const connect: string = process.env.MONGO_URI || "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority";

    const user1 = {
        firstName: "Peter",
        lastName: "Walsh",
        email: "peter.t.walsh@stonybrook.edu",
        username: "peteylumpkins",
        password: "password12345",
        verifyKey: 'verificationkey',
        isVerified: false,
        favoriteTileMaps: [],
        favoriteTileSets: [],
        joinedContests: [],
        joinedCommunities: [],
        friends: [],
        imageURL: " "
    }
    const user2 = {
        firstName: "Peter",
        lastName: "Walsh",
        email: "peteylumpkins@gmail.com",
        username: "petey",
        password: "password12345",
        verifyKey: 'verificationkey',
        isVerified: false,
        favoriteTileMaps: [],
        favoriteTileSets: [],
        joinedContests: [],
        joinedCommunities: [],
        friends: [],
        imageURL: " "
    }
    const tileset1: Partial<Tileset> = {
        columns: 4,
        lastSaveDate: new Date(Date.now()),
        image: "imageurl",
        imageHeight: 32,
        imageWidth: 32,
        margin: 4,
        name: "tileset1",
        properties: [],
        isPublished: false
    }

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
        isPublished: false
    }

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
        isPublished: false
    }

    /** 
     * The before method gets called before any of the nested testing suites or tests 
     * gets run. Before I do anything, I need to connect to the database.
     * {@link https://mochajs.org/#hooks}
     */
    before(async function() { await mongoose.connect(connect); });

    describe("getTilesetById", function() {

        let id: string | undefined;

        beforeEach(async function() {
            await TilesetModel.deleteMany();
            let tileset = await TilesetModel.create(tileset2);
            id = tileset._id.toString();
        });

        it("Success - Gets a tileset by id", async function() {
            let tilesets = new MongooseTilesetDBM();
            expect(id).not.undefined;
            let tileset = await tilesets.getTilesetById(id || "");
            expect(tileset).to.have.property("id", id);
            expect(tileset).to.have.property("name", tileset2.name);
        });

        it("Failure - Valid id but tileset doesn't exist", async function () {
            let tilesets = new MongooseTilesetDBM();
            expect(id).not.undefined;
            let tileset = await tilesets.getTilesetById(new mongoose.Types.ObjectId().toString());
            expect(tileset).equals("Error");
        })

        it("Failure - Invalid tileset id", async function() {
            let tilesets = new MongooseTilesetDBM();
            expect(id).not.undefined;
            let tileset = await tilesets.getTilesetById(id + "1" || "");
            expect(tileset).equals("Error");
        })


    });

    describe("createTileset", function() {

        beforeEach(async function() {
            await UserModel.deleteMany();
            await TilesetModel.deleteMany();
            await UserModel.create(user1);
        });

        it("Success - Creates a new tileset", async function() { 
            let tilesets = new MongooseTilesetDBM()
            let usr = await UserModel.findOne({email: user1.email});
            let id = usr !== null ? usr._id.toString() : "";
            expect(id).not.equals("");
            let ts = await tilesets.createTileset(id, tileset1);
            expect(ts).to.have.property("owner", id);
        });

        it("Failure - Valid id but doesn't exist", async function() {
            let tilesets = new MongooseTilesetDBM()
            let usr = await UserModel.findOne({email: user1.email});
            let id = usr !== null ? usr._id.toString() : "";
            expect(id).not.equals("");
            await UserModel.findByIdAndDelete(id);
            let ts = await tilesets.createTileset(id, tileset1);
            expect(ts).equals('Error');
        });

        it("Failure - Invalid Id", async function() {
            let tilesets = new MongooseTilesetDBM()
            let usr = await UserModel.findOne({email: user1.email});
            let id = usr !== null ? usr._id.toString() : "";
            expect(id).not.equals("");
            let ts = await tilesets.createTileset(id + "1", tileset1);
            expect(ts).equals('Error');
        });
    });

    describe("updateTileset", function() {

        beforeEach(async function() {
            await TilesetModel.deleteMany();
            await TilesetModel.create(tileset2);
        });

        it("Success - updates existing tileset with new data", async function() {
            let tilesets = new MongooseTilesetDBM();
            let tileset = await TilesetModel.findOne({name: tileset2.name});
            let id = tileset !== null ? tileset._id.toString() : "";
            expect(id).not.equal("");

            let updatedTileset = await tilesets.updateTilesetById(id, tileset1);
            expect(updatedTileset).to.have.property("name", "tileset1");

            tileset = await TilesetModel.findOne({name: tileset2.name});
            expect(tileset).null;

            tileset = await TilesetModel.findOne({name: tileset1.name});
            expect(tileset).not.null;
        });

        it("Success - updating existing tileset with empty object does nothing", async function() {

        });
    });

    describe("deleteTileset", function() {
        let id: string | undefined;

        this.beforeEach(async function() {
            await TilesetModel.deleteMany();
            await TilesetModel.create(tileset3);
            let tileset = await TilesetModel.create(tileset2);
            id = tileset._id.toString();
        });

        it("Success - Deletes the tileset by id", async function() {
            let tilesets = new MongooseTilesetDBM();
            
            expect(id).not.undefined;
            let result = await tilesets.deleteTilesetById(id || "");
            expect(result).to.have.property("id", id);

            let tileset = await TilesetModel.findById(id || "");
            expect(tileset).null;

            let tileset3 = await TilesetModel.findOne({name: "tileset3"});
            expect(tileset3).not.null;
        });

        it("Failure - Valid id but tileset does not exist with the id", async function() {
            let tilesets = new MongooseTilesetDBM();

            expect(id).not.undefined;
            let result = await tilesets.deleteTilesetById(new mongoose.Types.ObjectId().toString());
            expect(result).equals("Error");


            let tileset2 = await TilesetModel.findOne({name: "tileset2"});
            expect(tileset2).not.null;

            let tileset3 = await TilesetModel.findOne({name: "tileset3"});
            expect(tileset3).not.null;
        });
    });

    after(async function() { await mongoose.connection.close(); });
});