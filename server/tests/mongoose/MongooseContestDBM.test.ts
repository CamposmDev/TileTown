import mocha from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';

import UserSchema from "../../database/mongoose/schemas/user";
import MongooseUserDBM from "../../database/mongoose/managers/MongooseUserDBM";
import User from "../../types/User";
import dotenv from "dotenv";
import UserSchemaType from '../../database/mongoose/types/UserSchemaType';
import { ContestSchema } from '../../database/mongoose/schemas';
import { MongooseContestDBM } from '../../database/mongoose/managers';
import { Contest } from '../../types';
import contest from '../../database/mongoose/schemas/contest';


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
    describe("createContest", function() {});
    beforeEach(async function() { await ContestSchema.deleteMany() })
    it('It should create and return a new contest', async function() {
        let contest: MongooseContestDBM = new MongooseContestDBM()

        let partial = {
            "owner": "63560ddd205cc7cbe9c63b1d",
            "name": "Vo",
            "description": "My Contest Description",
            "participates": [],
            "startDate": "2021-01-03T23:30:15.123",
            "endDate": "2021-01-05T23:30:15.123",
            "isPublished": true
        }
        let con: Contest | null = await contest.createContest(partial)
        expect(con).not.null
        expect(con).property("owner", "63560ddd205cc7cbe9c63b1d")
        expect(con).property("name", "Vo")
        expect(con).property("description", "My Contest Description")
        expect(con).property("participates", [])
        expect(con).property("startDate", Date)
        expect(con).property("endDate", Date)
        expect(con).property("isPublished", true)
        
        if (con !== null) {
            let res = await ContestSchema.findById(con.id)
            expect(res).not.null;
        }
    })
})






    describe("getContest", function() {});


    describe("updateContest", function() {});

    describe("updateModerator", function() {});

    describe("deleteContest", function() {});

    after(async function() { await mongoose.connection.close(); });
});