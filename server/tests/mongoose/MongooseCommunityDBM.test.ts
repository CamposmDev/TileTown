import mocha from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';

import UserSchema from "../../database/mongoose/schemas/user";
import { CommunitySchema } from '../../database/mongoose/schemas';
import { MongooseCommunityDBM } from '../../database/mongoose/managers';
import MongooseUserDBM from "../../database/mongoose/managers/MongooseUserDBM";
import User from "../../types/User";
import dotenv from "dotenv";
import UserSchemaType from '../../database/mongoose/types/UserSchemaType';
import { Community } from '../../types';


/** 
 * A mocha testing suite for the MongooseCommunityDBM. I have linked the official documentation below.
 * {@link https://mochajs.org/}
 */
 describe("Testing MongooseCommunityDBM", function() {

    /** The connection string to connect to mongoose */
    const connect: string = process.env.MONGO_URI || "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority";

    /** 
     * The before method gets called before any of the nested testing suites or tests 
     * gets run. Before I do anything, I need to connect to the database.
     * {@link https://mochajs.org/#hooks}
     */
    before(async function() { await mongoose.connect(connect); });

    describe("getCommunityById", function() {
         let userId
         let commId: string
         beforeEach(async function() {
               await UserSchema.deleteMany()
               await UserSchema.create({
                  firstName: "Peter",
                  lastName: "Walsh",
                  email: "peter.t.walsh@stonybrook.edu",
                  username: "PeteyLumpkins",
                  password: "DummyPassword",
                  verifyKey: 'something?!',
                  isVerified: false,
                  favoriteTileMaps: [],
                  favoriteTileSets: [],
                  joinedContests: [],
                  joinedCommunities: [],
                  friends: [],
                  imageURL: " "
               })
            let user = await UserSchema.findOne({username: 'PeteyLumpkins'})
            userId = user !== null ? user._id.toString() : ''
            await CommunitySchema.deleteMany()
            await CommunitySchema.create({
               owner: userId,
               name: 'A Commmunity',
               description: 'Description Goes Here',
               memberCounter: 0,
               visibility: "public"
            })
            let comm = await CommunitySchema.findOne({owner: userId})
               commId = comm !== null ? comm._id.toString() : ''
        })

        it("Successfully retrived a community by id", async function() {
            let communities = new MongooseCommunityDBM
            let community = await communities.getCommunityById(commId)
            expect(community).not.null
            expect(community).property('name').eql('A Commmunity')
            expect(community).property('description').eql('Description Goes Here')
            expect(community).property('memberCount').eql(0)
            expect(community).property('visibility').eql("public")
        })
    });

    describe("createCommunity", function() {
      let userId: string
         beforeEach(async function() {
            await UserSchema.deleteMany()
            await CommunitySchema.deleteMany()
            
            await UserSchema.deleteMany()
            await UserSchema.create({
                  firstName: "Peter",
                  lastName: "Walsh",
                  email: "peter.t.walsh@stonybrook.edu",
                  username: "PeteyLumpkins",
                  password: "DummyPassword",
                  verifyKey: 'something?!',
                  isVerified: false,
                  favoriteTileMaps: [],
                  favoriteTileSets: [],
                  joinedContests: [],
                  joinedCommunities: [],
                  friends: [],
                  imageURL: " "
            })
            let user = await UserSchema.findOne({username: 'PeteyLumpkins'})
            userId = user !== null ? user._id : ''
            await CommunitySchema.deleteMany()
         })
        it('Successfully created community', async function() {
            let communities = new MongooseCommunityDBM()
            let comm: Community | null = await communities.createCommunity({
               owner: userId,
               name: 'A Commmunity',
               description: 'Description Goes Here',
               memberCount: 1,
               visibility: "private"
            })
            expect(comm).not.null
            expect(comm).property('owner').eql(userId)
            expect(comm).property('name').eql('A Commmunity')
            expect(comm).property('description').eql('Description Goes Here')
            expect(comm).property('memberCount').eql(1)
            expect(comm).property('visibility').eql("private")
        })
    });

    describe("updateCommunity", function() {
         let userId: string
         let commId: string
         beforeEach(async function() {
               await UserSchema.deleteMany()
               await UserSchema.create({
                  firstName: "Peter",
                  lastName: "Walsh",
                  email: "peter.t.walsh@stonybrook.edu",
                  username: "PeteyLumpkins",
                  password: "DummyPassword",
                  verifyKey: 'something?!',
                  isVerified: false,
                  favoriteTileMaps: [],
                  favoriteTileSets: [],
                  joinedContests: [],
                  joinedCommunities: [],
                  friends: [],
                  imageURL: " "
               })
               let user = await UserSchema.findOne({username: 'PeteyLumpkins'})
               userId = user !== null ? user._id.toString() : ''
               await CommunitySchema.deleteMany()
               await CommunitySchema.create({
                  owner: userId,
                  name: 'A Commmunity',
                  description: 'Description Goes Here',
                  memberCounter: 0,
                  visibility: "public"
               })
               let comm = await CommunitySchema.findOne({owner: userId})
               commId = comm !== null ? comm._id.toString() : ''
        })
        it('Successfully updated community by id', async function() {
            let communities = new MongooseCommunityDBM()
            let comm = await communities.updateCommunity(commId, {
               owner: userId,
               name: 'Updated Community Name',
               description: 'Another Description',
               memberCount: 3,
               visibility: 'private'
            })
            expect(comm).not.null
            expect(comm).property('name').eql('Updated Community Name')
        })
    });

    describe("addCommunityMember", function() {});

    describe("removeCommunityMember", function() {});

    describe("deleteCommunity", function() {});

    after(async function() { await mongoose.connection.close(); });
 });