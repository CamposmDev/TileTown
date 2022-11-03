import mocha from 'mocha';
import { expect } from 'chai';
import mongoose, { mongo } from 'mongoose';

import { UserModel, ContestModel } from '../../database/mongoose/schemas/';
import { MongooseContestDBM } from '../../database/mongoose/managers';
// import { Contest } from '../../../types/index';

/** 
 * A mocha testing suite for the MongooseCommunityDBM. I have linked the official documentation below.
 * {@link https://mochajs.org/}
 */
 describe("Testing MongooseContestDBM", function() {

    /** The connection string to connect to mongoose */
    const connect: string = process.env.MONGO_URI || "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority";

    /** 
     * The before method gets called before any of the nested testing suites or tests 
     * gets run. Before I do anything, I need to connect to the database.
     * {@link https://mochajs.org/#hooks}
     */
    before(async function() { await mongoose.connect(connect); });

    /**
     * A set of tests for the method MongooseContestDBM.createContest()
     * @see MongooseContestDBM.createContest
     */
    describe("createContest", function() {
    
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
            await ContestModel.deleteMany() 
        });

        // it('It should create and return a new contest', async function() {
        //     let contest: MongooseContestDBM = new MongooseContestDBM()
        //     let user = await UserModel.create({
        //         firstName: "Tuyen",
        //         lastName: "Vo",
        //         email: "tuyen.vo@stonybrook.edu",
        //         username: "Emdoiqua",
        //         password: "DummyPassword",
        //         verifyKey: 'something?!',
        //         isVerified: false,
        //         favoriteTileMaps: [],
        //         favoriteTileSets: [],
        //         joinedContests: [],
        //         joinedCommunities: [],
        //         friends: [],
        //         imageURL: " "
        //     })
    
        //     let partial: Partial<Contest> = {
        //         "owner": user._id.toString(),
        //         "name": "Vo",
        //         "description": "My Contest Description",
        //         "participates": [],
        //         "isPublished": true
        //     }
        //     let con: Contest | null = await contest.createContest(partial)
        //     expect(con).not.null
        //     expect(con).property("owner", user._id.toString())
        //     expect(con).property("name", "Vo")
        //     expect(con).property("description", "My Contest Description")
        //     expect(con).property("participates").to.have.length(0);
        //     expect(con).to.have.property("startDate")
        //     expect(con).to.have.property("endDate")
        //     expect(con).property("isPublished", true)
            
        //     if (con !== null) {
        //         let res = await ContestModel.findById(con.id)
        //         expect(res).not.null;
        //     }
        // });
        
    });

    describe("getContest", function() {});

    describe("updateContest", function() {});

    describe("updateModerator", function() {});

    describe("deleteContest", function() {});

    after(async function() { await mongoose.connection.close(); });
  
});