import mocha from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../express';

import { UserModel } from "../../database/mongoose/schemas";
import MongooseUserDBM from "../../database/mongoose/managers/MongooseUserDBM";
import User from "../../types/User";
import dotenv from "dotenv";
import UserSchemaType from '../../database/mongoose/types/UserSchemaType';
import { CommunityModel } from '../../database/mongoose/schemas';
import { MongooseCommunityDBM } from '../../database/mongoose/managers';

/** 
 * A mocha testing suite for the MongooseCommunityDBM. I have linked the official documentation below.
 * {@link https://mochajs.org/}
 */
 describe("Testing MongooseCommunityDBM", function() {

    const server = app.listen("3000");
    /** The connection string to connect to mongoose */
    const connect: string = process.env.MONGO_URI || "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority";

    /** 
     * The before method gets called before any of the nested testing suites or tests 
     * gets run. Before I do anything, I need to connect to the database.
     * {@link https://mochajs.org/#hooks}
     */
    before(async function() { await mongoose.connect(connect); });

    describe("getCommunityById", function() {
        let userId: string
        let commId: string
        beforeEach(async function() {
            await UserModel.deleteMany()
            await UserModel.create({
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
            let user = await UserModel.findOne({username: 'PeteyLumpkins'})
            userId = user !== null ? user._id.toString() : ''
            await CommunityModel.deleteMany()
            await CommunityModel.create({
                owner: userId,
                name: 'A Commmunity',
                description: 'Description Goes Here',
                memberCounter: 0,
                visibility: "public"
            })
            let comm = await CommunityModel.findOne({owner: userId})
            commId = comm !== null ? comm._id.toString() : ''
        })
        it('Successfully retreived community by id', async function() {
            let res = await request(app).get('/api/community/' + commId).send()
            expect(res.status).equals(200)
        })
    });

    describe("createCommunity", function() {
        let userId: string
        beforeEach(async function() {
            UserModel.deleteMany()
            CommunityModel.deleteMany()
            
            await UserModel.deleteMany()
            await UserModel.create({
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
            let user = await UserModel.findOne({username: 'PeteyLumpkins'})
            userId = user !== null ? user._id.toString() : ''
            await CommunityModel.deleteMany()
        })
        it('Successfully created community', async function() {
            let payload = {
                owner: userId,
               name: 'A Commmunity',
               description: 'Description Goes Here',
               memberCount: 1,
               visibility: "private"
            }
            let res = await request(app).post('/api/community/').send(payload)
            expect(res.status).equals(201)
        })
    });

    describe("updateCommunity", function() {
        let userId: string
         let commId: string
         beforeEach(async function() {
               await UserModel.deleteMany()
               await UserModel.create({
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
               let user = await UserModel.findOne({username: 'PeteyLumpkins'})
               userId = user !== null ? user._id.toString() : ''
               await CommunityModel.deleteMany()
               await CommunityModel.create({
                  owner: userId,
                  name: 'A Commmunity',
                  description: 'Description Goes Here',
                  memberCounter: 0,
                  visibility: "public"
               })
               let comm = await CommunityModel.findOne({owner: userId})
               commId = comm !== null ? comm._id.toString() : ''
               
        })
        it('Successfully updated community by id', async function() {
        let payload = {
            owner: userId,
            name: 'Updated Community Name',
            description: 'Another Description',
            memberCount: 3,
            visibility: 'private'
            }
            let res = await request(app).put('/api/community/' + commId).send(payload)
            expect(res.status).equals(200)
        })
    });

    describe("addCommunityMember", function() {

    });

    describe("removeCommunityMember", function() {
        
    });

    describe("deleteCommunity", function() {
        let userId: string
      let commId: string
      beforeEach(async function() {
            await UserModel.deleteMany()
            await UserModel.create({
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
            let user = await UserModel.findOne({username: 'PeteyLumpkins'})
            userId = user !== null ? user._id.toString() : ''
            await CommunityModel.deleteMany()
            await CommunityModel.create({
               owner: userId,
               name: 'A Commmunity',
               description: 'Description Goes Here',
               memberCounter: 0,
               visibility: "public"
            })
            let comm = await CommunityModel.findOne({owner: userId})
            commId = comm !== null ? comm._id.toString() : ''
      })
      it('Successfully deleted a community', async function() {
         let res = await request(app).delete('/api/community/' + commId).send()
         expect(res.status).equals(200)
      })
    });

    after(async function() { 
        await mongoose.connection.close();
        /** Close the connection to the server */
        server.close(); 
    });
 });